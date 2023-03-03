## End-to-end testing
In order to run end-to-end tests it is required to run Subpace Node and Farmer locally, as well as Subsquid Archive and Blockeplorer squid:

### 1. Start local Subspace devnet
To start local devnet (node and farmer) run:
```
make devnet-up
```

You can verify that devnet is producing blocks by:
- checking [Polkadot/app](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) connecting to a local node RPC at `ws://127.0.0.1:9944`.
- alternatively, you can check Docker logs:
```
make devnet-logs
```

In order to stop local devnet:
```
make devnet-down
```

### 2. Running local Subsquid Archive
To start Subsquid Archive run:
```
make local-archive-up
```
You can verify that it's up and running by visiting Graphiql Explorer UI on [http://localhost:4444/graphql](http://localhost:4444/graphql).

In order to stop local Subsquid Archive:
```
make local-archive-down
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
