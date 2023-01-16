import { QUERY_BLOCK_LIST_CONNECTION } from 'Block/query'
import { ACCOUNT_MIN_VAL } from 'Home/constants'

export const SUCCESS_MOCK = {
  request: {
    query: QUERY_BLOCK_LIST_CONNECTION,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: {
      blocksConnection: {
        edges: [
          {
            id: '1',
            hash: '',
            height: 12345,
            extrinsics: [{ id: '' }],
            events: [{ id: '' }],
            timestamp: '',
            spacePledged: '0',
            blockchainSize: '0',
            stateRoot: '0',
          },
        ],
        accountsConnection: {
          totalCount: '0',
        },
        extrinsicsConnection: {
          totalCount: '0',
        },
      },
    },
  },
}

export const ERROR_MOCK = {
  request: {
    query: QUERY_BLOCK_LIST_CONNECTION,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {},
}

export const EMPTY_MOCK = {
  request: {
    query: QUERY_BLOCK_LIST_CONNECTION,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: {
      extrinsics: [],
      blocks: [],
    },
  },
}
