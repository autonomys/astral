import { QUERY_BLOCK_LIST_CONNECTION } from 'Block/query'

export const SUCCESS_MOCK_DESKTOP = {
  request: {
    query: QUERY_BLOCK_LIST_CONNECTION,
    variables: { first: 10, after: undefined },
  },
  result: {
    data: {
      blocksConnection: {
        edges: [
          {
            cursor: '1',
            node: {
              blockchainSize: '1306341146624',
              extrinsicRoot: null,
              hash: '0x684782ad5eb50f85dfbff551caac6389e514c958ec6ad295c061c9686feae2b5',
              height: '1275904',
              id: '0001275904-68478',
              parentHash: '0x6b63bca8920e30daea975d44e42b886e0bda93430a4fc63b479a89553e9db125',
              spacePledged: '46300704157696',
              specId: 'subspace@4',
              stateRoot: '0xadb6eac677b60a3a3aa4a0a11b60854b5b581ce24cdcdf0f5a04cdc8437df189',
              timestamp: '2022-12-05T01:59:11.000000Z',
              events: [
                {
                  id: '0001275904-000000-68478',
                },
              ],
              extrinsics: [
                {
                  id: '0001275904-000000-68478',
                },
              ],
              author: {
                id: '0x684782ad5eb50f85dfbff551caac6389e514c958',
              },
            },
          },
        ],
        totalCount: 1275905,
        pageInfo: {
          endCursor: '1',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
        },
      },
    },
  },
}

export const SUCCESS_MOCK_MOBILE = {
  request: {
    query: QUERY_BLOCK_LIST_CONNECTION,
    variables: { first: 5, after: undefined },
  },
  result: {
    data: {
      blocksConnection: {
        edges: [
          {
            cursor: '1',
            node: {
              blockchainSize: '1306341146624',
              extrinsicRoot: null,
              hash: '0x684782ad5eb50f85dfbff551caac6389e514c958ec6ad295c061c9686feae2b5',
              height: '1275904',
              id: '0001275904-68478',
              parentHash: '0x6b63bca8920e30daea975d44e42b886e0bda93430a4fc63b479a89553e9db125',
              spacePledged: '46300704157696',
              specId: 'subspace@4',
              stateRoot: '0xadb6eac677b60a3a3aa4a0a11b60854b5b581ce24cdcdf0f5a04cdc8437df189',
              timestamp: '2022-12-05T01:59:11.000000Z',
              events: [
                {
                  id: '0001275904-000000-68478',
                },
              ],
              extrinsics: [
                {
                  id: '0001275904-000000-68478',
                },
              ],
              author: {
                id: '0x684782ad5eb50f85dfbff551caac6389e514c958',
              },
            },
          },
        ],
        totalCount: 1275905,
        pageInfo: {
          endCursor: '1',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
        },
      },
    },
  },
}
