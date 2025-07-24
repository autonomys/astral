.PHONY: help up down logs status clean

# Default target
help:
	@echo "Shared Autonomys Node"
	@echo ""
	@echo "Available commands:"
	@echo "  up      - Start the node"
	@echo "  down    - Stop the node"
	@echo "  logs    - View node logs"
	@echo "  status  - Check node status"
	@echo "  clean   - Stop and remove all containers and volumes"

up:
	@echo "Starting shared node..."
	docker compose -f docker-compose.node.yml up -d

down:
	@echo "Stopping shared node..."
	docker compose -f docker-compose.node.yml down

logs:
	@echo "Showing node logs..."
	docker compose -f docker-compose.node.yml logs -f node

status:
	@echo "Node status:"
	@docker compose -f docker-compose.node.yml ps
	@echo ""
	@echo "Node health check (if running):"
	@curl -s http://localhost:9944/health 2>/dev/null || echo "Node not responding on port 9944"

clean:
	@echo "Stopping and cleaning up..."
	docker compose -f docker-compose.node.yml down -v
	@echo "Done!" 