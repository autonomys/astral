/**
 * Block Generator Script
 * This script will insert new blocks into the test database at regular intervals
 * to demonstrate real-time GraphQL subscriptions.
 *
 * Run with: node generate-blocks.js
 */

// Mock package in case node-fetch isn't installed
let fetch;
try {
  fetch = require("node-fetch");
} catch (e) {
  console.error("node-fetch not found, using global fetch");
  fetch = global.fetch;
}

// Configuration
const GRAPHQL_ENDPOINT = "http://localhost:8080/v1/graphql";
const ADMIN_SECRET = "helloworld";
const INTERVAL_MS = 5000; // Generate a block every 5 seconds

/**
 * Generate a new block by inserting into block_generator table
 * This triggers the add_test_block function in the database
 */
async function generateBlock() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Admin-Secret": ADMIN_SECRET,
        "X-Hasura-Role": "user",
      },
      body: JSON.stringify({
        query: `
          mutation GenerateBlock {
            insert_block_generator_one(object: {}) {
              id
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL error:", data.errors[0].message);
    } else if (data.data && data.data.insert_block_generator_one) {
      const timestamp = new Date().toISOString();
      console.log(
        `[${timestamp}] Generated new block (ID: ${data.data.insert_block_generator_one.id})`
      );
    } else {
      console.error("Unexpected response:", data);
    }
  } catch (error) {
    console.error("Failed to generate block:", error.message);
  }
}

// Display startup message
console.log("Block Generator");
console.log("==============");
console.log(`Generating blocks every ${INTERVAL_MS / 1000} seconds`);
console.log("Press Ctrl+C to stop");
console.log("");

// Run immediately then set interval
generateBlock();
setInterval(generateBlock, INTERVAL_MS);
