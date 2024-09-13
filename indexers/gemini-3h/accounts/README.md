# Autonomys Astral Explorer Accounts

The Autonomys Astral Explorer Accounts is a specialized SubQuery project that indexes all asset transfers and system remarks on the Autonomys Gemini 3H Testnet. This project is designed to support the account tracking functionality for the Astral Explorer, providing real-time data on user activities and balances.

## Overview

This SubQuery project is tailored specifically for the Autonomys Astral Explorer, focusing on:

1. Indexing all asset transfers using the balances pallet
2. Capturing system remarks for additional user actions
3. Tracking and updating account balances based on various activities

## Project Structure

The project consists of the following key components:

- `project.ts`: Defines the project configuration, including network endpoints and data sources.
- `schema.graphql`: Outlines the data structure for transfers and accounts.
- `src/mappings/`: Contains TypeScript functions that process blockchain events and update the database.

## Key Features

- Real-time tracking of asset transfers
- Monitoring of system remarks for specific user actions
- Account balance calculation and updates
- Support for querying transfer history and account statistics

## Running the Project

To run this project locally:

1. Ensure you have Node.js and Docker installed on your system.
2. Clone the repository: `git clone https://github.com/autonomys/astral.git`
3. Navigate to the project directory: `cd astral/indexers/accounts`
4. Install dependencies: `yarn install`
5. Start the project: `yarn dev`

This will start the SubQuery node, PostgreSQL database, and GraphQL query service.

## Querying the Data

Once the project is running, you can access the GraphQL playground at `http://localhost:3000`. Here's an example query to get you started:
