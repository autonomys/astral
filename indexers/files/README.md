# Autonomys Astral Indexer - Files

The Autonomys Astral Indexer - Files is a specialized SubQuery project that indexes all files on the Autonomys Network. This project is designed to support the files tracking functionality for the Astral Explorer, providing real-time data on files.

## Overview

This SubQuery project is tailored specifically for the Autonomys Astral Explorer, focusing on:

1. Indexing all files and CIDs on the Autonomys Mainnet

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
3. Navigate to the project directory: `cd astral/indexers/files`
4. Install dependencies: `yarn install`
5. Start the project: `yarn dev`

This will start the SubQuery node, PostgreSQL database, and GraphQL query service.

## Querying the Data

Once the project is running, you can access the GraphQL playground at `http://localhost:3000`. Here's an example query to get you started:
