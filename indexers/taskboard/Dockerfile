FROM node:18-alpine

# Switch to root user to install packages
USER root

# Install Python and build tools
RUN apk update && apk add --no-cache python3 make g++

# Switch back to the default user
USER node

# Create app directory
WORKDIR /app

# Copy the package.json file
COPY package.json ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Change ownership of the directory to the node user
USER root
RUN chown -R node:node /app

# Switch back to the default user
USER node

# Install dependencies
RUN yarn install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]