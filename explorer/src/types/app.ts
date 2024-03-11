import type { Chains } from 'constants/chains'
import type { ReactNode } from 'react'

export type ChildrenPageProps = {
  children: ReactNode
}

export type PageProps<T> = {
  params: T
}

export type ChainParam = { chain?: Chains }

export type AccountIdParam = { accountId?: string }
export type BlockIdParam = { blockId?: string }
export type ExtrinsicIdParam = { extrinsicId?: string }
export type EventIdParam = { eventId?: string }
export type LogIdParam = { logId?: string }

export type OperatorIdParam = { operatorId?: string }

export type ChainPageProps = PageProps<ChainParam>

export type AccountIdPageProps = PageProps<AccountIdParam>
export type BlockIdPageProps = PageProps<BlockIdParam>
export type ExtrinsicIdPageProps = PageProps<ExtrinsicIdParam>
export type EventIdPageProps = PageProps<EventIdParam>
export type LogIdPageProps = PageProps<LogIdParam>

export type OperatorIdPageProps = PageProps<OperatorIdParam>
