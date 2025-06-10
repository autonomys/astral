# Autonomys Network Astral API

![Autonomys Banner](https://github.com/autonomys/astral/blob/main/.github/images/autonomys-banner.webp)

[Astral](../README.md)

This is a public API for the Autonomys Network, built with NestJS and documented using Swagger. It provides endpoints for interacting with the network data.

## Table of content

- [🏄 Get Started](#-get-started)
- [🔩 Requirements](#-requirements)
- [🛳 Build](#-build)
- [📜 API Documentation](#-api-documentation)

## 🏄 Get Started

The application is built with NestJS and TypeScript. Follow these steps to set up your local development environment:

1. Clone the repository and navigate to the `api` directory:

```bash
git clone git@github.com:autonomys/astral.git
cd astral/api
```

2. If you use `nvm` to manage Node.js versions, ensure you're using the stable channel:

```bash
nvm use stable
```

3. Install the dependencies:

```bash
yarn install
```

4. To start the development server, run:

```bash
yarn start:dev
```

The server will run at [http://localhost:3000](http://localhost:3000).

## 🔩 Requirements

You will need to have the necessary environment variables set up to connect to the backend services.

## 🛳 Build

To create a production build, execute the following command:

```bash
yarn build
```

This will compile the project into an optimized build ready for deployment.

## 📜 API Documentation

The API is documented using Swagger. Once the server is running, you can access the API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
