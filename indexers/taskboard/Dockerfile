FROM node:18-alpine

# Install Python and build tools
RUN apk update && apk add --no-cache python3 make g++

# Create app directory and set ownership
WORKDIR /app
RUN chown node:node /app

# Switch to node user
USER node

# Copy package files with correct ownership
COPY --chown=node:node package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application files with correct ownership
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE ${BULL_PORT}

# Command to run the app
CMD ["yarn", "start"]