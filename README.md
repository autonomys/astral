# Astral Block Explorer

![Autonomys Banner](https://github.com/autonomys/astral/blob/main/.github/images/autonomys-banner.webp)

[![build](https://github.com/autonomys/astral/actions/workflows/build.yaml/badge.svg)](https://github.com/autonomys/astral/actions/workflows/build.yaml)

- [Astral Block Explorer](https://explorer.autonomys.xyz/) Astral Block Explorer

## Astral Block Explorer

<picture>
   <source 
      srcset="https://github.com/autonomys/astral/blob/main/.github/images/explorer-dark.png"
      media="(prefers-color-scheme: dark)"
   />
   <source
      srcset="https://github.com/autonomys/astral/blob/main/.github/images/explorer-light.png"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
   />
   <img
      alt="Autonomys Network Explorer"
      src="https://github.com/autonomys/astral/blob/main/.github/images/explorer-light.png"
      width="100%"
   />
</picture>

## Overview

- [Explorer](./explorer/README.md) - Next.js app based on React and Tailwind CSS, uses Apollo Client to fetch data from Astral Indexers
- [Indexers](./indexers/README.md) - Includes various SubQuery indexers organized by network and functionality

## Development

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v18.x or later)
- Yarn (v2.x or later)

You can check your Node and Yarn versions with 'node -v' and 'yarn -v' respectively.

### Installation

These step focus on setting up the development environment for the Astral Block Explorer.
You can also find the instructions for setting up the Squid backend and Health check services in their respective directories.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/autonomys/astral.git
   cd astral
   ```

2. **Move to the explorer directory:**

   ```bash
   cd explorer
   ```

3. **Install the dependencies:**

   ```bash
   yarn install
   ```

4. **Copy the environment variables:**

   ```bash
   cp .env.sample .env
   ```

5. **Run the development server:**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Multi-Network Indexers Setup

To set up the multi-network indexers, follow these steps:

1. **Environment Vars**:
   At the root, run:
   ```bash
      for f in .env .env.dev .env.prod; do cp -v .env.sample "$f"; done
   ```

2. **Navigate to the indexers directory:**

   ```bash
   cd indexers
   ```

3. **Install the dependencies:**

   ```bash
   yarn
   ```

4. **Build the indexers:**

   ```bash
   yarn codegen && yarn build
   ```

5. **Start a local node, the PostgreSQL database with multiple tables, Hasura, and various SubQuery nodes and a TaskBoard (BullMQ) using Docker Compose:**

   From the root directory, run:

   ```bash
   yarn dev
   ```

   Also, for development purposes you can run each indexer separately:
   ```
   yarn dev:consensus
   yarn dev:domain
   yarn dev:staking
   yarn dev:leaderboard
   ```
This command will initialize a PostgreSQL database configured with multiple tables, launch the Hasura GraphQL engine, and start multiple Subquery nodes to index all networks. This setup provides all the necessary data for different sections of the explorer, ensuring a comprehensive indexing solution for the application.

## Contributing

We welcome contributions to this project. If you are interested in enhancing the features of the app or fixing bugs, please follow these steps:

1. **Fork the Repository**

   Fork the project to your own GitHub account. This will be your private workspace for staging changes.

2. **Create a Branch**

   Create a branch in your forked repository for each set of changes you intend to make or issue you are addressing.

   ```bash
   git checkout -b your-branch-name
   ```

3. **Discuss New Features**

   For new features, it's preferable to first open an issue to discuss potential changes. This helps ensure that your efforts align with the project direction and that duplicate work is avoided.

4. **Bug Fixes**

   For bug fixes, feel free to create a branch and proceed with fixes. Please ensure to clearly describe the bug and how your code resolves it.

5. **Make Your Changes**

   Make the necessary modifications to the codebase and commit them. Please keep your commits granular and well-explained.

6. **Write Tests**

   Ensure that your code is tested to prevent regressions.

7. **Pull Request**

   Submit a pull request to the main branch of the original repository. Provide a clear description of the problem and solution. Include relevant issue numbers if applicable.

8. **Code Review**

   Your changes will be reviewed by maintainers, who may provide feedback or questions. Address feedback and push your fixes as additional commits.

## License

This project is licensed under the [MIT License](LICENSE.md).
