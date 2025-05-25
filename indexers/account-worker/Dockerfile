# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /monorepo

# Copy monorepo root configuration and all indexer packages
COPY package.json yarn.lock lerna.json* .yarnrc.yml* ./
COPY indexers/ ./indexers/

# Install all dependencies for the workspace (including devDependencies for building)
RUN yarn install --frozen-lockfile --production=false

# Build the account-worker package
WORKDIR /monorepo/indexers/account-worker
RUN yarn workspace account-worker build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy built worker code
COPY --from=builder /monorepo/indexers/account-worker/dist ./indexers/account-worker/dist/
COPY --from=builder /monorepo/indexers/account-worker/package.json ./indexers/account-worker/package.json

# Copy necessary files for installing production dependencies in a workspace context
COPY --from=builder /monorepo/yarn.lock ./
COPY --from=builder /monorepo/lerna.json* ./ # If used by yarn for workspace resolution
COPY --from=builder /monorepo/.yarnrc.yml* ./ # If used by yarn

# Copy the local dependency (@autonomys/auto-consensus)
# Its package.json and necessary runtime files must be available for yarn install.
COPY --from=builder /monorepo/indexers/consensus/ ./indexers/consensus/

# Install production dependencies for the workspace context now present in /app
# Yarn will use the root yarn.lock and the copied package.json files.
RUN yarn install --production --frozen-lockfile --ignore-scripts

# Set final working directory
WORKDIR /app/indexers/account-worker

COPY --from=builder /monorepo/indexers/account-worker/.env.example ./.env.example

CMD ["yarn", "start"]

# Healthcheck (optional, basic example)
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#  CMD node -e "process.exit(0)" # Replace with a more meaningful healthcheck if possible 