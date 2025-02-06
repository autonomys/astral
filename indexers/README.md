# Autonomys Indexers

![Autonomys Banner](https://github.com/autonomys/astral/blob/main/.github/images/autonomys-banner.webp)

[Astral](../README.md)

This directory contains various SubQuery indexers used within the Astral project. Each indexer is dedicated to handling specific data transformation and querying tasks, making the data more accessible and useful for applications and services.

## Indexers Overview

Each folder represent a network, since it's possible that the testnet and mainnet have different data models.
Each network has its own indexer, but they are all try to follow the same structure.

- `consensus`: Handles the indexing of consensus-related data. (blocks, extrinsics, events and accounts)
- `leaderboard`: Handles the indexing of leaderboard.
- `staking`: Focuses on indexing and managing staking-related data.

## Installation and Setup

Each indexer has its own set of dependencies and setup instructions. Navigate to the respective indexer directory and follow the README.md there for detailed instructions.

## Development

To contribute to an indexer or modify its behavior:

1. Clone the repository if you haven't done so already.
2. Open Docker Desktop
3. Run `yarn` from this directory
4. Run `bash scripts/run.sh --network taurus --env dev --task dev` from this directory
   - This will start the indexers for the taurus network in dev mode
   - You can change the network, env and task to fit your needs
   - Tasks:
     - `dev`: start the indexers stack
     - `dev-bootstrap`: start the minimal indexers stack (usually used to run `apply-seeds` before running `dev`)
     - `codegen`: generate the types
     - `build`: build the indexers
     - `metadata`: generate the metadata for Hasura
     - `migrate`: start the migrations for Hasura
     - `apply-seeds:mainnet`: apply the seeds for the mainnet

## Testing

Ensure that any changes made are accompanied by tests to verify functionality and prevent regressions.

## Contribution

Contributions to improve or enhance the indexers are always welcome. Follow the standard procedure by forking the repository, making your changes, and submitting a pull request.

For more detailed guidance on how to contribute, refer to the main project's [Contributing](../README.md#Contributing) section.

## License

Each indexer is released under the same license as the main project. See the [License](../LICENSE.md) file for more details.
