import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { FileByIdQuery, GetCidQuery, GetCidQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { extractFileData, FileData } from 'utils/file'
import { FilePreview } from './FilePreview'
import { FileRawData } from './FileRawData'
import { FileUploadOptions } from './FileUploadOptions'
import { QUERY_CID } from './query'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

export const FileDetailsTab: FC<Props> = ({ file, isDesktop = false }) => {
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const [fileData, setFileData] = useState<FileData | null>(null)
  const { loading, data } = useIndexersQuery<GetCidQuery, GetCidQueryVariables>(QUERY_CID, {
    variables: { cid: file.id ?? '' },
    skip: !inFocus || !inView,
  })

  const getDataDetails = useCallback(() => {
    if (!data) return
    setFileData(extractFileData(data))
  }, [data])

  useEffect(() => {
    getDataDetails()
  }, [getDataDetails])

  if (loading) return <Spinner isXSmall />
  if (!data || !fileData) return <NotFound />

  return (
    <div ref={ref}>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='File Preview'>
          <FilePreview fileData={fileData} />
        </Tab>
        <Tab title='File Upload Options'>
          <FileUploadOptions fileData={fileData} />
        </Tab>
        <Tab title='Raw File Data'>
          <FileRawData fileData={fileData} />
        </Tab>
      </PageTabs>
    </div>
  )
}
