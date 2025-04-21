# Autonomys Block Explorer Frontend

![Autonomys Banner](https://github.com/autonomys/astral/blob/main/.github/images/autonomys-banner.webp)

[Astral](../README.md)

Block explorer frontend that uses the Subsquid API to get the network information and display it for easy user interaction.

## Table of content

- [🏄 Get Started](#get-started)
- [🔩 Requirements](#requirements)
- [🛳 Build](#build)
- [🔧 Environment Variables](#-environment-variables)

## 🏄 Get Started

The application is built with Next.js, React.js, Tailwind CSS and TypeScript. Follow these steps to set up your local development environment:

1. Clone the repository and navigate to the `explorer` directory:

```bash
git clone git@github.com:autonomys/astral.git
cd astral/explorer
```

2. If you use `nvm` to manage Node.js versions, ensure you're using the stable channel:

```bash
nvm use stable
```

3. Install the dependencies:

```bash
yarn install
```

4. Copy the `.env.sample` file to `.env` and update it with the necessary environment variables, especially the Subsquid GraphQL API URL:

```bash
cp .env.sample .env
```

Then edit the .env file with your favorite editor

5. To start the development server, run:

```bash
yarn dev
```

The server will run at [http://localhost:3000](http://localhost:3000).

## 🔩 Requirements

You will need to have the Subsquid GraphQL API URL to connect to the backend.

## 🛳 Build

To create a production build, execute the following command:

```bash
yarn build
```

This will compile the project into an optimized build ready for deployment.
