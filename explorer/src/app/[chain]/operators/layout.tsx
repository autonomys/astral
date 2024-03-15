import { MainLayout } from 'components/layout/Layout'
import { OperatorHeader } from 'components/layout/OperatorHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<OperatorHeader />}>{children}</MainLayout>
}
