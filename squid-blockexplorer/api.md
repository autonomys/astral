# Using Graphql API

This API provides access to blockchain data, including accounts, blocks, extrinsics, events, calls, and logs

## API endpoints

- Gemini-2a API: `https://squid.gemini-2a.subspace.network/graphql`
- Gemini-3c API: `https://squid.gemini-3c.subspace.network/graphql`

## Types

### Account

| Field        | Type                       | Description                                       |
|--------------|----------------------------|---------------------------------------------------|
| id           | ID!                        | Unique identifier for the account.                |
| free         | BigInt                     | Free balance of the account.                      |
| reserved     | BigInt                     | Reserved balance of the account.                  |
| total        | BigInt              | Total balance of the account.                     |
| updatedAt    | BigInt                     | Timestamp of the last update to the account.      |
| extrinsics   | [Extrinsic!]! | Extrinsics associated with the account.           |

### Block

| Field            | Type                              | Description                                           |
|------------------|-----------------------------------|-------------------------------------------------------|
| id               | ID!                               | Unique identifier for the block.                      |
| height           | BigInt!                    | Block height.                                         |
| timestamp        | DateTime!                         | Timestamp of the block.                               |
| hash             | String!                           | Block hash.                                           |
| parentHash       | String!                           | Parent block hash.                                    |
| specId           | String!                           | Specification ID.                                     |
| stateRoot        | String!                           | State root hash.                                      |
| extrinsicRoot    | String                            | Extrinsic root hash.                                  |
| extrinsics       | [Extrinsic!]!        | Extrinsics included in the block.                     |
| events           | [Event!]!            | Events associated with the block.                     |
| calls            | [Call!]!             | Calls associated with the block.                      |
| logs             | [Log!]!              | Logs associated with the block.                       |
| spacePledged     | BigInt!                           | Space pledged in the block.                           |
| blockchainSize   | BigInt!                           | Blockchain size.                                      |
| extrinsicsCount  | Int!                              | Number of extrinsics in the block.                    |
| eventsCount      | Int!                              | Number of events in the block.                        |
| author           | Account                           | Account that authored the block.                      |

### Extrinsic

| Field        | Type                        | Description                                               |
|--------------|-----------------------------|-----------------------------------------------------------|
| id           | ID!                         | Unique identifier for the extrinsic.                      |
| hash         | String!                     | Extrinsic hash.                                           |
| indexInBlock | Int!                        | Index of the extrinsic in the block.                      |
| nonce        | BigInt                      | Nonce value of the extrinsic.                             |
| name         | String!                     | Extrinsic name.                                           |
| signer       | Account                     | Account that signed the extrinsic.                        |
| signature    | String               | Extrinsic signature.                                       |
| error        | JSON                        | Error details if the extrinsic failed.                    |
| tip          | BigInt                      | Tip value of the extrinsic.                               |
| fee          | BigInt                      | Transaction fee.                                          |
| success      | Boolean!                    | Whether the extrinsic was successful.                      |
| block        | Block!                      | Block containing the extrinsic.                           |
| pos          | Int                         | Position of the extrinsic.                                 |
| timestamp    | DateTime!            | Timestamp of the extrinsic.                                |
| args         | JSON                        | Arguments of the extrinsic.                                |
| events       | [Event]        | Events associated with the extrinsic.                      |
| calls        | [Call!]        | Calls associated with the extrinsic.                       |

### Event

| Field        | Type         | Description                                |
|--------------|--------------|--------------------------------------------|
| id           | ID!          | Unique identifier for the event.           |
| indexInBlock | Int!         | Index of the event in the block.           |
| name         | String!      | Event name.                                |
| timestamp    | DateTime!    | Timestamp of the event.                    |
| phase        | String!      | Event phase.                               |
| pos          | Int          | Position of the event.                     |
| args         | JSON         | Arguments of the event.                    |
| block        | Block        | Block containing the event.                |
| extrinsic    | Extrinsic    | Extrinsic associated with the event.       |
| call         | Call         | Call associated with the event.            |

### Call

| Field        | Type         | Description                                |
|--------------|--------------|--------------------------------------------|
| id           | ID!          | Unique identifier for the call.            |
| name         | String!      | Call name.                                 |
| timestamp    | DateTime!    | Timestamp of the call.                     |
| success      | Boolean!     | Whether the call was successful.           |
| args         | JSON         | Arguments of the call.                     |
| block        | Block!       | Block containing the call.                 |
| extrinsic    | Extrinsic!   | Extrinsic associated with the call.        |
| error        | JSON         | Error details if the call failed.          |
| signer       | String       | Signer of the call.                        |
| parent       | Call         | Parent call.                               |
| calls        | [Call]       | Calls derived from this call.              |
| pos          | Int          | Position of the call.                      |

### Log

| Field        | Type         | Description                                |
|--------------|--------------|--------------------------------------------|
| kind         | String!      | Kind of the log entry.                     |
| value        | JSON         | Value of the log entry.                    |
| block        | Block!       | Block containing the log entry.            |

