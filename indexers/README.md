# Indexers

[Astral](../README.md)

This directory contains various Subsquid indexers used within the Astral project. Each indexer is dedicated to handling specific data transformation and querying tasks, making the data more accessible and useful for applications and services.

## Indexers Overview

- `consensus-squid`: Responsible for indexing consensus-related data across the blockchain.
- `leaderboard-squid`: Handles the indexing of leaderboard and account-related data.
- `staking-squid`: Focuses on indexing and managing staking-related data.
- `squid-blockexplorer`: Utilized for the Astral Block Explorer to index and transform blockchain data for visual representation. (old)

## Installation and Setup

Each indexer has its own set of dependencies and setup instructions. Navigate to the respective indexer directory and follow the README.md there for detailed instructions.

## Development

To contribute to an indexer or modify its behavior:

1. Clone the repository if you haven't done so already.
2. Open Docker Desktop
3. Run `docker compose up` from root directory
4. Navigate to the specific indexer directory you want to modify.
5. Make your changes and ensure they meet the project standards.
6. Run `sqd codegen`
7. Run `sqd migration:generate`
8. Run `sqd process`

To get Hasura console running, run `yarn start` from db/ directory

## Testing

Ensure that any changes made are accompanied by tests to verify functionality and prevent regressions.

## Contribution

Contributions to improve or enhance the indexers are always welcome. Follow the standard procedure by forking the repository, making your changes, and submitting a pull request.

For more detailed guidance on how to contribute, refer to the main project's [Contributing](../README.md#Contributing) section.

## License

Each indexer is released under the same license as the main project. See the [License](../LICENSE.md) file for more details.
