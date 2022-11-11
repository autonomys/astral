# Subspace block explorer squid

Squid used to process and transform data for Subspace block explorer, based on [Squid template](https://github.com/subsquid/squid-template).

## How to start

```bash
# 1. Install dependencies
npm ci

# 2. Compile typescript files
make build

# 3. Start target Postgres database and detach
make up

# 4. Start the processor
make process
```

Make sure you provide following environmental variables:
- `CHAIN_RPC_ENDPOINT` - Public node RPC endpoint
- `ARCHIVE_ENDPOINT` - GraphQL endpoint to a local or remote archive
> Please, refer to Subsquid [docs](https://docs.subsquid.io/archives/) to learn, more about Squid Archives

In order to use GraphiQL explorer, run following in a separate terminal:
```
make serve
```

## Development
For more details on development workflow, please, refer to the Squid template [Dev flow](https://github.com/subsquid/squid-template#dev-flow) docs

## Deployment
This repository utilizes GitHub workflow to build Docker images and push them to container registry. For more details check [`gh-container-image.yml`](../.github/workflows/gh-container-image.yml).

Guide on setting up the environment, including sample `docker-compose.yml` and Nginx config can be found [here](https://github.com/subspace/infra/tree/main/_docs/8_BlockExplorerSquid)
