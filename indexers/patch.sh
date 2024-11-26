# Define the environment variable
ENVIRONMENT=prod  # Change this to 'prod' or 'dev' as needed

# Important, this first assume you already applied the patch as per this PR to your host fetch.service.js
# https://github.com/subquery/subql/pull/2594


docker pause ${ENVIRONMENT}-astral-indexers-node-1

docker cp ./node_modules/@subql/node-core/dist/indexer/fetch.service.js ${ENVIRONMENT}-astral-indexers-consensus_subquery_node-1:/node_modules/@subql/node-core/dist/indexer/fetch.service.js

docker cp ./node_modules/@subql/node-core/dist/indexer/fetch.service.js ${ENVIRONMENT}-astral-indexers-leaderboard_subquery_node-1:/node_modules/@subql/node-core/dist/indexer/fetch.service.js

docker cp ./node_modules/@subql/node-core/dist/indexer/fetch.service.js ${ENVIRONMENT}-astral-indexers-staking_subquery_node-1:/node_modules/@subql/node-core/dist/indexer/fetch.service.js

docker cp ./node_modules/@subql/node-core/dist/indexer/fetch.service.js ${ENVIRONMENT}-astral-indexers-files_subquery_node-1:/node_modules/@subql/node-core/dist/indexer/fetch.service.js

docker unpause ${ENVIRONMENT}-astral-indexers-node-1