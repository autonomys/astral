import { MainLayout } from 'components/layout/Layout'
import { SwapHeader } from 'components/layout/SwapHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<SwapHeader />}>{children}</MainLayout>
}
