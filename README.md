![build](https://github.com/subspace/blockexplorer/actions/workflows/build.yaml/badge.svg)

# Astral

- [Astral Block Explorer](https://explorer.subspace.network/) Astral Block Explorer
- [Astral Subsquid Playground](https://squid.gemini-3g.subspace.network/graphql) Astral Subspace SubSquid

## Astral Block Explorer

<table width="100%" border="0">
    <tr>
        <td width="50%" valign="top" border="0">
        <picture>
          <source 
              srcset="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
              media="(prefers-color-scheme: dark)"
          />
          <source
              srcset="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
              media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <img
            alt="Astral Block Explorer"
            src="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
            align="left"
            width="100%"
        />
        </picture>
      </td>
    <td width="50%" valign="top" border="0">
      <picture>
      <source 
          srcset="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          media="(prefers-color-scheme: dark)"
      />
      <source
          srcset="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
          alt="Astral Block Explorer"
          src="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          align="left"
          width="100%"
      />
</picture>
        </td>
    <tr>
</table>

## Astral Subsquid Playground

**_Picture To Be Added_**

## Overview

- [Explorer](./explorer/README.md) - Next.js app based on React and Tailwind CSS, uses Apollo Client to fetch data from Astral Subsquid
- [Squid](./squid-blockexplorer/README.md) - backend app, utilizes [Subsquid Framework](https://docs.subsquid.io/overview/) for indexing and transforming chain data as well as exposing it using GraphQL
- [Health check](./health-check/README.md) - utility service to check health status of an internal service and expose it as a REST API endpoint

## Development

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v18.x or later)
- Yarn (v2.x or later)

You can check your Node and Yarn versions with `node -v` and `yarn -v` respectively.

### Installation

These step focus on setting up the development environment for the Astral Block Explorer.
You can also find the instructions for setting up the Squid backend and Health check services in their respective directories.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/subspace/astral.git
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

4. **Run the development server:**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
