# Autonomys Astral Explorer Consensus

The Autonomys Astral Explorer Consensus is a specialized SubQuery project that indexes all consensus-related events on the Autonomys Network. This project is designed to support the consensus tracking functionality for the Astral Explorer, providing real-time data on validator activities and network consensus.

## Overview

This SubQuery project is tailored specifically for the Autonomys Astral Explorer, focusing on:

1. Indexing all consensus-related events using the relevant pallets
2. Capturing system remarks for additional consensus actions
3. Tracking and updating validator performance and network consensus metrics

## Project Structure

The project consists of the following key components:

- `project.ts`: Defines the project configuration, including network endpoints and data sources.
- `schema.graphql`: Outlines the data structure for consensus events, validators, and network metrics.
- `src/mappings/`: Contains TypeScript functions that process blockchain events and update the database.

## Key Features

- Real-time tracking of consensus events
- Monitoring of system remarks for specific consensus actions
- Validator performance calculation and updates
- Support for querying consensus history and network statistics

## Running the Project

To run this project locally:

1. Ensure you have Node.js and Docker installed on your system.
2. Clone the repository: `git clone https://github.com/autonomys/astral.git`
3. Navigate to the project directory: `cd astral/indexers/consensus`
4. Install dependencies: `yarn install`
5. Start the project: `yarn dev`

This will start the SubQuery node, PostgreSQL database, and GraphQL query service.

## Querying the Data

Once the project is running, you can access the GraphQL playground at `http://localhost:3000`. Here's an example query to get you started:
