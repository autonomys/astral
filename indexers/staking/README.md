# Autonomys Astral Explorer Staking

The Autonomys Astral Explorer Staking is a specialized SubQuery project that indexes all staking-related events on the Autonomys Network. This project is designed to support the staking functionality for the Astral Explorer, providing real-time data on user staking activities and rewards.

## Overview

This SubQuery project is tailored specifically for the Autonomys Astral Explorer, focusing on:

1. Indexing all staking events using the staking pallet
2. Capturing system remarks for additional staking actions
3. Calculating and updating user staking rewards and positions

## Project Structure

The project consists of the following key components:

- `project.ts`: Defines the project configuration, including network endpoints and data sources.
- `schema.graphql`: Outlines the data structure for staking events, accounts, and reward entries.
- `src/mappings/`: Contains TypeScript functions that process blockchain events and update the database.

## Key Features

- Real-time tracking of staking events
- Monitoring of system remarks for specific staking actions
- Staking reward calculation and updates
- Support for querying staking history and account statistics

## Running the Project

To run this project locally:

1. Ensure you have Node.js and Docker installed on your system.
2. Clone the repository: `git clone https://github.com/autonomys/astral.git`
3. Navigate to the project directory: `cd astral/indexers/staking`
4. Install dependencies: `yarn install`
5. Start the project: `yarn dev`

This will start the SubQuery node, PostgreSQL database, and GraphQL query service.

## Querying the Data

Once the project is running, you can access the GraphQL playground at `http://localhost:3000`. Here's an example query to get you started:
