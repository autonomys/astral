import { StakeHeader } from '@/components/layout/StakeHeader'
import { MainLayout } from 'components/layout/Layout'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<StakeHeader />}>{children}</MainLayout>
}
