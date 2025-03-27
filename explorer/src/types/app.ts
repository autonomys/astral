import { NetworkId } from '@autonomys/auto-utils'
import type { ReactNode } from 'react'

export type ChildrenPageProps = {
  children: ReactNode
}

type PageProps<T> = {
  params: T
}

export type ChainParam = { chain?: NetworkId }

export type AccountIdParam = { accountId?: string }
export type BlockIdParam = { blockId?: string }
export type ExtrinsicIdParam = { extrinsicId?: string }
export type EventIdParam = { eventId?: string }
export type LogIdParam = { logId?: string }

export type CIDParam = { cid?: string }

export type DomainIdParam = { domainId?: string }

export type OperatorIdParam = { operatorId?: string }

export type ChainPageProps = PageProps<ChainParam>

export type AccountIdPageProps = PageProps<AccountIdParam>
export type BlockIdPageProps = PageProps<BlockIdParam>
export type ExtrinsicIdPageProps = PageProps<ExtrinsicIdParam>
export type EventIdPageProps = PageProps<EventIdParam>
export type LogIdPageProps = PageProps<LogIdParam>

export type CIDPageProps = PageProps<CIDParam>

export type DomainIdPageProps = PageProps<DomainIdParam>

export type OperatorIdPageProps = PageProps<OperatorIdParam>

export type Route = {
  name: string
  title: string
  networks?: NetworkId[]
  children?: Route[]
  hidden?: boolean
}
