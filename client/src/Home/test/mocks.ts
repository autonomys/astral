import { QUERY_HOME } from 'Home/query'
import { ACCOUNT_MIN_VAL } from 'Home/constants'

export const SUCCESS_MOCK = {
  request: {
    query: QUERY_HOME,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: {
      blocks: [
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
          extrinsicsCount: '0',
          eventsCount: '0',
        },
      ],
      extrinsics: [],
      accountsConnection: {
        totalCount: '0',
      },
      extrinsicsConnection: {
        totalCount: '0',
      },
    },
    error: null,
  },
}

export const ERROR_MOCK = {
  request: {
    query: QUERY_HOME,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: null,
    error: {
      message: 'Cannot query field "nonexistentField" on type "Query".',
      locations: [
        {
          line: 2,
          column: 3,
        },
      ],
      extensions: {
        code: 'GRAPHQL_VALIDATION_FAILED',
        exception: {
          stacktrace: [
            'GraphQLError: Cannot query field "nonexistentField" on type "Query".',
            '...additional lines...',
          ],
        },
      },
    },
  },
}

export const EMPTY_MOCK = {
  request: {
    query: QUERY_HOME,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: undefined,
    error: undefined,
  },
}
