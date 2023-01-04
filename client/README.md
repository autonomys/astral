# Subspace block explorer frontend

Blockexplorer frontend that uses the Subsquid API to get the network information and display it for easy user interaction.

## Table of content

- [🏄 Get Started](#get-started)
- [🔩 Requirements](#requirements)
- [🛳 Build](#build)

## 🏄 Get Started

The app is a React app built with [React.js](https://reactjs.org/) + TypeScript.

To start local development:

```bash
git clone git@github.com:subspace/blockexplorer.git
cd blockexplorer/client
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