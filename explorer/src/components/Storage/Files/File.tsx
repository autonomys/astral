'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { FileByIdDocument, FileByIdQuery, FileByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { CIDParam } from 'types/app'
import { FileDetailsCard } from './FileDetailsCard'
import { FileDetailsTab } from './FileDetailsTab'

export const File: FC = () => {
  const { ref, inView } = useInView()
  const { cid } = useParams<CIDParam>()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1440px)')

  const { loading, setIsVisible } = useIndexersQuery<FileByIdQuery, FileByIdQueryVariables>(
    FileByIdDocument,
    {
      variables: { cid: cid ?? '' },
      skip: !inFocus,
    },
    Routes.storage,
    'file',
  )

  const consensusEntry = useQueryStates((state) => state[Routes.storage].file)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const file = useMemo(() => data && data.files_files[0], [data])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {!loading && file ? (
          <>
            <FileDetailsCard file={file} isDesktop={isDesktop} />
            <FileDetailsTab file={file} isDesktop={isDesktop} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
