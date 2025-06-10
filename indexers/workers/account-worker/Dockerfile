FROM node:20-alpine
WORKDIR /app

# Copy workspace configuration from the parent directory (indexers)
COPY package.json yarn.lock lerna.json ./
COPY workers/account-worker/package.json ./workers/account-worker/package.json

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Copy pre-built application
COPY workers/account-worker/dist ./workers/account-worker/dist/

# Set working directory
WORKDIR /app/workers/account-worker

CMD ["yarn", "start"]