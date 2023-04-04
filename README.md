![build](https://github.com/subspace/blockexplorer/actions/workflows/build.yaml/badge.svg)

# Subspace block explorer

![Alt text](https://user-images.githubusercontent.com/5139220/202504441-25af2556-2c4d-46e6-874e-9d6120f2d987.png)

[Subspace Network](https://subspace.network/) block explorer

## Overview    

- [Client](./client/README.md) - UI app based on React
- [Squid](./squid-blockexplorer/README.md) - backend app, utilizes [Subsquid Framework](https://docs.subsquid.io/overview/) for indexing and transforming chain data as well as exposing it using GraphQL
- [Health check](./health-check/README.md) - utility service to check health status of an internal service and expose it as a REST API endpoint
