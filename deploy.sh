#!/bin/bash
# Astral Deployment Helper
# Convenience wrapper for managing infrastructure stacks

set -e

COMMAND=$1
STACK=$2

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

show_usage() {
    echo "Astral Deployment Helper"
    echo ""
    echo "Usage: ./deploy.sh <command> <stack>"
    echo ""
    echo "Commands:"
    echo "  start    - Start services"
    echo "  stop     - Stop services"
    echo "  restart  - Restart services"
    echo "  logs     - View logs"
    echo "  status   - Show status"
    echo "  build    - Build services"
    echo ""
    echo "Stacks:"
    echo "  core     - Core indexing services"
    echo "  staking  - Staking services"
    echo "  all      - All services"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh start core      # Start core services"
    echo "  ./deploy.sh logs staking    # View staking logs"
    echo "  ./deploy.sh status all      # Check all services"
}

if [ -z "$COMMAND" ] || [ -z "$STACK" ]; then
    show_usage
    exit 1
fi

# Execute command for specified stack
execute_command() {
    local stack_dir=$1
    local stack_name=$2
    
    if [ ! -d "infra/$stack_dir" ]; then
        echo -e "${RED}Error: Stack directory 'infra/$stack_dir' not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Executing '$COMMAND' for $stack_name stack...${NC}"
    cd "infra/$stack_dir" && make $COMMAND
    cd - > /dev/null
}

case $STACK in
    core)
        execute_command "core" "Core"
        ;;
    staking)
        execute_command "staking" "Staking"
        ;;
    all)
        echo -e "${GREEN}Executing '$COMMAND' for all stacks...${NC}"
        execute_command "core" "Core"
        echo ""
        execute_command "staking" "Staking"
        ;;
    *)
        echo -e "${RED}Unknown stack: $STACK${NC}"
        echo ""
        show_usage
        exit 1
        ;;
esac

echo -e "${GREEN}Done!${NC}" 