// Type declarations to resolve Polkadot package conflicts
declare module '@polkadot/types-codec/types/codec' {
  export interface ArgsDef {
    [key: string]: string | any
  }
}

declare module '@polkadot/types-codec/types/registry' {
  export interface Registry {
    findMetaCall: (...args: any[]) => any
  }
}

// Re-export types to ensure consistency
export type Hash = any
export type U8aFixed = any
