import { FarmingHeader } from 'components/layout/FarmingHeader'
import { MainLayout } from 'components/layout/Layout'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<FarmingHeader />}>{children}</MainLayout>
}
