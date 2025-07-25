# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Enable corepack
RUN corepack enable

# Copy workspace files and install dependencies
COPY package.json yarn.lock lerna.json ./
COPY . .
RUN yarn install

# Build only the account-worker
RUN yarn lerna run build --scope=account-worker

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Enable corepack
RUN corepack enable

# Copy only the built account-worker and its dependencies
COPY --from=builder /app/workers/account-worker/dist ./workers/account-worker/dist/
COPY --from=builder /app/workers/account-worker/package.json ./workers/account-worker/
COPY --from=builder /app/package.json /app/yarn.lock /app/lerna.json ./

# Install only production dependencies
RUN yarn workspaces focus account-worker --production

# Set working directory
WORKDIR /app/workers/account-worker

CMD ["yarn", "start"]