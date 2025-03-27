import { MainLayout } from 'components/layout/Layout'
import { TransferHeader } from 'components/layout/TransferHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<TransferHeader />}>{children}</MainLayout>
}
