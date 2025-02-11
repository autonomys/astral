#!/bin/bash

# Default values
NETWORK="mainnet"
ENV="dev"
MODE="up"
BOOTSTRAP=false

# Function to display usage
usage() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  --network    Network to run (mainnet|taurus|localhost) [default: mainnet]"
    echo "  --env       Environment (dev|prod) [default: dev]"
    echo "  --bootstrap Run in bootstrap mode"
    echo "  --down      Stop the services"
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --network)
            NETWORK="$2"
            shift 2
            ;;
        --env)
            ENV="$2"
            shift 2
            ;;
        --bootstrap)
            BOOTSTRAP=true
            shift
            ;;
        --down)
            MODE="down"
            shift
            ;;
        --help)
            usage
            ;;
        *)
            echo "Unknown parameter: $1"
            usage
            ;;
    esac
done

# Validate network
if [[ ! "$NETWORK" =~ ^(mainnet|taurus|localhost)$ ]]; then
    echo "Error: Invalid network. Must be mainnet, taurus, or localhost"
    exit 1
fi

# Validate environment
if [[ ! "$ENV" =~ ^(dev|prod)$ ]]; then
    echo "Error: Invalid environment. Must be dev or prod"
    exit 1
fi

# Echo configuration
echo "Configuration:"
echo "  Network: $NETWORK"
echo "  Environment: $ENV"
echo "  Mode: $MODE"
echo "  Bootstrap: $BOOTSTRAP"

# Set project name based on network and environment
PROJECT_NAME="${NETWORK}-${ENV}-astral-indexers"

# Load environment files
if [ -f "../.env.$NETWORK" ]; then
    echo "Loading .env.$NETWORK"
    set -o allexport
    source ../.env.$NETWORK
    set +o allexport
fi

if [ -f "../.env" ]; then
    echo "Loading .env"
    set -o allexport
    source ../.env
    set +o allexport
fi

# Build base docker compose command
DOCKER_COMPOSE="docker compose -p $PROJECT_NAME -f ../docker-compose.yml"

# Add production override if needed
if [ "$ENV" = "prod" ]; then
    DOCKER_COMPOSE="$DOCKER_COMPOSE -f ../docker-compose.prod.yml"
fi

# Add network-specific override if exists
if [ -f "../docker-compose.${NETWORK}.yml" ]; then
    DOCKER_COMPOSE="$DOCKER_COMPOSE -f ../docker-compose.${NETWORK}.yml"
fi

bash scripts/run.sh --network $NETWORK --env $ENV --task codegen
bash scripts/run.sh --network $NETWORK --env $ENV --task build

# Execute docker compose command
if [ "$MODE" = "up" ]; then
    if [ "$BOOTSTRAP" = true ]; then
        $DOCKER_COMPOSE up --remove-orphans
    else
        $DOCKER_COMPOSE --profile dictionary --profile task --profile indexers up --remove-orphans
    fi
else
    $DOCKER_COMPOSE down
fi