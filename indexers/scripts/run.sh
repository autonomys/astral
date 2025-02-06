#!/bin/bash

# Loop through all parameters
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
        --task)
            TASK="$2"
            shift 2
            ;;
        *)
            echo "Unknown parameter: $1"
            exit 1
            ;;
    esac
done

# Echo the parameters
echo "Network: $NETWORK"
echo "Environment: $ENV"
echo "Task: $TASK"

# Load network-specific env file first if it exists
if [ -f "../.env.$NETWORK" ]; then
    echo "Loading .env.$NETWORK"
    set -o allexport
    source ../.env.$NETWORK
    set +o allexport
fi

# Load default env file if it exists
if [ -f "../.env" ]; then
    echo "Loading .env"
    set -o allexport
    source ../.env
    set +o allexport
fi

# Execute the yarn task
if [[ "$TASK" == *"dev"* ]]; then
    # Replace 'dev' with the environment value
    MODIFIED_TASK="${TASK//dev/$ENV}"
    yarn "$MODIFIED_TASK"
else
    yarn "$TASK"
fi
