'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { FolderByIdDocument, FolderByIdQuery, FolderByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { CIDParam } from 'types/app'
import { FolderDetailsCard } from './FolderDetailsCard'
import { FolderDetailsTab } from './FolderDetailsTab'

export const Folder: FC = () => {
  const { ref, inView } = useInView()
  const { cid } = useParams<CIDParam>()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1440px)')

  const { loading, setIsVisible } = useIndexersQuery<FolderByIdQuery, FolderByIdQueryVariables>(
    FolderByIdDocument,
    {
      variables: { cid: cid ?? '' },
      skip: !inFocus,
    },
    Routes.storage,
    'folder',
  )

  const consensusEntry = useQueryStates((state) => state[Routes.storage].folder)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const folder = useMemo(() => data && data.files_folders[0], [data])

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
        {!loading && folder ? (
          <>
            <FolderDetailsCard folder={folder} isDesktop={isDesktop} />
            <FolderDetailsTab
              childCount={folder.childCount.aggregate?.count ?? 0}
              isDesktop={isDesktop}
            />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
