import { MainLayout } from 'components/layout/Layout'
import { ProfileHeader } from 'components/layout/ProfileHeader'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<ProfileHeader />}>{children}</MainLayout>
}
