import { MainLayout } from 'components/layout/Layout'
import { LeaderboardHeader } from 'components/layout/LeaderboardHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<LeaderboardHeader />}>{children}</MainLayout>
}
