import { EmptyHeader } from 'components/layout/EmptyHeader'
import { MainLayout } from 'components/layout/Layout'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<EmptyHeader />}>{children}</MainLayout>
}
