import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FileByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { FilePreview } from './FilePreview'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

export const FileDetailsTab: FC<Props> = ({ file, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title='File Preview'>
        <FilePreview cid={file.id} />
      </Tab>
    </PageTabs>
  )
}
