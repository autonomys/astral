## End-to-end testing
In order to run end-to-end tests it is required to run Subpace Node and Farmer locally, as well as Subsquid Archive and Blockeplorer squid:

### 1. Start local Subspace Devnet and Archive
To start local Devnet (node and farmer) as well as local Archive run:
```
make devnet-up
```

In order to verify that Devnet is producing blocks:
- check [Polkadot/app](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) connecting to a local node RPC at `ws://127.0.0.1:9944`.
- alternatively, you can check Docker container logs

In order to verify that Archive up and running - visit Graphiql Explorer UI on [http://localhost:4444/graphql](http://localhost:4444/graphql).

In order to stop local Devnet and Archive:
```
make devnet-down
```

### 3. Start Blockexplorer Squid
Follow the steps from [How to start](README.md#how-to-start) section. 
Example of `.env` file, which includes variables necessary to run e2e tests, assuming that Archive, Squid and Node are using default ports:
```
DB_NAME=squid
DB_PASS=squid
DB_PORT=23798
PROCESSOR_PROMETHEUS_PORT=3000
GQL_PORT=4350
ARCHIVE_ENDPOINT=http://127.0.0.1:8888/graphql
CHAIN_RPC_ENDPOINT=ws://127.0.0.1:9944
SQUID_GRAPHQL_ENDPOINT=http://127.0.0.1:4350/graphql
```
