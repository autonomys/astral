import {sts, Result, Option, Bytes, BitSequence} from './support'

export const AccountId32 = sts.bytes()

export type DomainId = number

export type H256 = Bytes

export const H256 = sts.bytes()

export const DomainId = sts.number()
