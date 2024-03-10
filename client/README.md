# Subspace block explorer frontend

[Astral](../README.md)

Block explorer frontend that uses the Subsquid API to get the network information and display it for easy user interaction.

## Table of content

- [🏄 Get Started](#get-started)
- [🔩 Requirements](#requirements)
- [🛳 Build](#build)

## 🏄 Get Started

The app is a React app built with [React.js](https://reactjs.org/) + TypeScript.

To start local development:

```bash
git clone git@github.com:subspace/astral.git
cd astral/client
# OPTIONAL: when using nvm to manage Node.js versions
nvm use stable
yarn
```

Environment variables for this project are set on the `.env` file and here you can set the Subsquid graphql api url that you'll be using, you can find the needed environment variables on the `.env.sample` file.

Finally, run the app:

```bash
yarn start
```

This will start the development server under:
`http://localhost:3000`

## 🔩 Requirements

Needs the subsquid graphql api url.

## 🛳 Build

To create a production build, run from the root of the project:

```bash
yarn build
# serve production build
yarn serve
```

## Environment Variables

| Variables                       | Required | Default Value or Description                                                      |
| ------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `REACT_APP_PUBLIC_URL`          | yes      | `/`                                                                               |
| `REACT_APP_RPC_URL`             | yes      | `wss://rpc-0.<chainName>.subspace.network/ws`                                     |
|                                 |          |                                                                                   |
| `REACT_APP_MOCK_WALLET`         | no       | Set to `true` if you want to mock a specific connected wallet to ease development |
| `REACT_APP_MOCK_WALLET_ADDRESS` | no       | Set the wallet address (Subspace format) to mock                                  |
| `REACT_APP_MOCK_WALLET_SOURCE`  | no       | Set the source (wallet extension) to mock                                         |
