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

// export const ERROR_MOCK = {
//   request: {
//     query: QUERY_BLOCK_LIST_CONNECTION,
//     variables: { first: 10, after: null },
//   },
//   result: {
//     errors: [
//       {
//         message: 'response might exceed the size limit',
//         locations: [
//           {
//             line: 2,
//             column: 5,
//           },
//         ],
//         path: ['blocksConnection'],
//         extensions: {
//           code: 'INTERNAL_SERVER_ERROR',
//           exception: {
//             message: 'response might exceed the size limit',
//             stacktrace: [
//               'GraphQLError: response might exceed the size limit',
//               '    at locatedError (/squid/node_modules/graphql/error/locatedError.js:29:10)',
//               '    at /squid/node_modules/graphql/execution/execute.js:479:52',
//               '    at runMicrotasks (<anonymous>)',
//               '    at processTicksAndRejections (node:internal/process/task_queues:96:5)',
//               '    at async Promise.all (index 0)',
//               '    at async execute (/squid/node_modules/apollo-server-core/dist/requestPipeline.js:202:20)',
//               '    at async processGraphQLRequest (/squid/node_modules/apollo-server-core/dist/requestPipeline.js:148:28)',
//               '    at async processHTTPRequest (/squid/node_modules/apollo-server-core/dist/runHttpQuery.js:221:30)',
//             ],
//           },
//         },
//       },
//     ],
//     data: null,
//   },
// }

// export const EMPTY_MOCK = {
//   request: {
//     query: QUERY_BLOCK_LIST_CONNECTION,
//     variables: { first: 10, after: null },
//   },
//   result: {
//     data: {
//       extrinsics: [],
//       blocks: [],
//     },
//   },
// }
