## End-to-end testing
In order to run e2e tests it is required to run Subpace node and farmer locally, as well as Subsquid Archive and Blockeplorer squid:

### 1. Start local Subspace Node and Farmer
- Clone Subspace [monorepo](https://github.com/subspace/subspace)
- Change `CONFIRMATION_DEPTH_K` variable to `1` [here](https://github.com/subspace/subspace/blob/cb385c5221/crates/subspace-runtime-primitives/src/lib.rs#L27), otherwise you'll have to wait 100 blocks until your block are processed by the Subsquid Archive and the Squid
- Build and run node:
```
cargo run --release --bin subspace-node -- --dev --blocks-pruning archive --state-pruning archive
```
- Start farmer:
```
cargo run --release --bin subspace-farmer farm --reward-address REWARD-ADDRESS --plot-size PLOT-SIZE
``` 
For more details on how build and start node and farmer, please refer to [this](https://github.com/subspace/subspace/blob/main/docs/development.md).

### 2. Running local Subsquid Archive
To start Subsquid Archive run:
```
make local-archive up
```
You can verify that it's up and running by visiting Graphiql Explorer UI on [http://localhost:4444/graphql](http://localhost:4444/graphql).

In order to stop local Subsquid Archive:
```
make local-archive down
```

### 3. Start Blockexplorer squid
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
