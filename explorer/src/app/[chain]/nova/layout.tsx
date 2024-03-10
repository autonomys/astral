import { Header } from 'components/layout/Header'
import { MainLayout } from 'components/layout/Layout'
import type { ChildrenPageProps } from 'types/app'

export default async function Layout({ children }: ChildrenPageProps) {
  return <MainLayout subHeader={<Header />}>{children}</MainLayout>
}
