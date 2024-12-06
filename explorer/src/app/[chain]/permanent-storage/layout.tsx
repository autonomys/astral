import { MainLayout } from 'components/layout/Layout'
import { StorageHeader } from 'components/layout/StorageHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<StorageHeader />}>{children}</MainLayout>
}
