export type OperatorAllowListRestricted = { operators: string[] }
export type OperatorAllowListOpen = { anyone: null }
export type OperatorAllowList = OperatorAllowListRestricted | OperatorAllowListOpen

export type Domain = {
  domainId: string
  domainName: string
  operatorAllowList: OperatorAllowList
}
