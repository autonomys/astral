import { DomainHeader } from 'components/layout/DomainHeader'
import { MainLayout } from 'components/layout/Layout'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<DomainHeader />}>{children}</MainLayout>
}
