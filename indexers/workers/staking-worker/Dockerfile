FROM node:20-alpine
WORKDIR /app

# Copy workspace configuration from the parent directory (indexers)
COPY package.json yarn.lock lerna.json ./
COPY workers/staking-worker/package.json ./workers/staking-worker/package.json

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Copy pre-built application
COPY workers/staking-worker/dist ./workers/staking-worker/dist/

# Set working directory
WORKDIR /app/workers/staking-worker

CMD ["yarn", "start"] 