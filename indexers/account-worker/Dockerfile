FROM node:20-alpine
WORKDIR /app

# Copy workspace configuration from the indexers directory
COPY package.json yarn.lock lerna.json ./
COPY account-worker/package.json ./account-worker/package.json

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Copy pre-built application
COPY account-worker/dist ./account-worker/dist/

# Set working directory
WORKDIR /app/account-worker

CMD ["yarn", "start"]