import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FC } from 'react'
import { FolderDetailsFileList } from './FolderDetailsFileList'

type Props = {
  childCount: number
  isDesktop?: boolean
}

export const FolderDetailsTab: FC<Props> = ({ childCount, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Files (${childCount})`}>
        <FolderDetailsFileList />
      </Tab>
    </PageTabs>
  )
}