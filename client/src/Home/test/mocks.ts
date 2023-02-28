import { QUERY_HOME } from 'Home/query'
import { ACCOUNT_MIN_VAL } from 'Home/constants'

export const SUCCESS_MOCK_DESKTOP = {
  request: {
    query: QUERY_HOME,
    variables: { limit: 10, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: {
      blocks: [
        {
          id: '0001275904-68478',
          hash: '0x684782ad5eb50f85dfbff551caac6389e514c958ec6ad295c061c9686feae2b5',
          height: '1275904',
          timestamp: '2022-12-05T01:59:11.000000Z',
          stateRoot: '0xadb6eac677b60a3a3aa4a0a11b60854b5b581ce24cdcdf0f5a04cdc8437df189',
          blockchainSize: '1306341146624',
          spacePledged: '46300704157696',
          extrinsicsCount: 6,
          eventsCount: 23,
        },
      ],
      extrinsics: [
        {
          hash: '0x2a62e719564edbddf89ff062ba3e788eebb3d1cfb1b38d159e6df432cfd6d6f3',
          id: '0001275904-000005-68478',
          success: true,
          pos: 23,
          block: {
            id: '0001275904-68478',
            height: '1275904',
          },
          name: 'Subspace.vote',
        },
      ],
      accountsConnection: {
        totalCount: 95662,
      },
      extrinsicsConnection: {
        totalCount: 2598,
      },
    },
  },
}

export const SUCCESS_MOCK_MOBILE = {
  request: {
    query: QUERY_HOME,
    variables: { limit: 3, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
  },
  result: {
    data: {
      blocks: [
        {
          id: '0001275904-68478',
          hash: '0x684782ad5eb50f85dfbff551caac6389e514c958ec6ad295c061c9686feae2b5',
          height: '1275904',
          timestamp: '2022-12-05T01:59:11.000000Z',
          stateRoot: '0xadb6eac677b60a3a3aa4a0a11b60854b5b581ce24cdcdf0f5a04cdc8437df189',
          blockchainSize: '1306341146624',
          spacePledged: '46300704157696',
          extrinsicsCount: 6,
          eventsCount: 23,
        },
      ],
      extrinsics: [
        {
          hash: '0x2a62e719564edbddf89ff062ba3e788eebb3d1cfb1b38d159e6df432cfd6d6f3',
          id: '0001275904-000005-68478',
          success: true,
          pos: 23,
          block: {
            id: '0001275904-68478',
            height: '1275904',
          },
          name: 'Subspace.vote',
        },
      ],
      accountsConnection: {
        totalCount: 95662,
      },
      extrinsicsConnection: {
        totalCount: 2598,
      },
    },
  },
}
