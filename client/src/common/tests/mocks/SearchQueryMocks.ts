import { QUERY_BLOCK_BY_ID } from 'Block/query'

export const BLOCK_BY_ID_SEARCH = {
  request: {
    query: QUERY_BLOCK_BY_ID,
    variables: { blockId: 1 },
  },
  result: {
    data: {
      blocks: [
        {
          id: '0000000001-5b025',
          height: '1',
          hash: '0x5b02567f8d7fd54224f6dbee8ef430053d5fb379c1561dac4e1c9a59db7732b6',
          stateRoot: '0xecbdbb36de00bb6e7a8e8539dd7e4f0f0dda3e7bb728a6e133d4ca740d2a5b52',
          timestamp: '2022-09-04T03:34:13.001000Z',
          extrinsicRoot: null,
          specId: 'subspace@3',
          parentHash: '0x43d10ffd50990380ffe6c9392145431d630ae67e89dbc9c014cac2a417759101',
          extrinsics: [
            {
              id: '0000000001-000000-5b025',
              hash: '0x2c77588b35ee063f6b672cdf4001e902f919bb3be6904d1b3c4fbf692f9cf113',
              name: 'Timestamp.set',
              success: true,
              block: {
                height: '1',
                timestamp: '2022-09-04T03:34:13.001000Z',
              },
              pos: 1,
            },
          ],
          events: [
            {
              id: '0000000001-000000-5b025',
              name: 'System.ExtrinsicSuccess',
              phase: 'ApplyExtrinsic',
              pos: 2,
              block: {
                height: '1',
                id: '0000000001-5b025',
              },
              extrinsic: {
                pos: 1,
                block: {
                  height: '1',
                  id: '0000000001-5b025',
                },
              },
            },
          ],
          logs: [
            {
              block: {
                height: '1',
                timestamp: '2022-09-04T03:34:13.001000Z',
              },
              kind: 'PreRuntime',
              id: '0000000001-5b025-0',
            },
          ],
        },
      ],
    },
  },
}
