.PHONY: help setup build force-build start stop restart reload logs status clean ps config init-hasura force-init-hasura

# Load .env file if it exists
ifneq (,$(wildcard .env))
    include .env
    export
endif

# Default environment
ENV ?= dev
COMPOSE_FILE := docker-compose.yml
COMPOSE_PROJECT := astral-core

# Set compose files based on environment
ifeq ($(ENV),prod)
    COMPOSE_FILE := docker-compose.yml -f docker-compose.prod.yml
endif

# Default target
help:
	@echo "Astral Core Stack Commands:"
	@echo ""
	@echo "  make setup          - Initial setup and environment check"
	@echo "  make build          - Build core indexers (uses cache)"
	@echo "  make force-build    - Build indexers (bypasses cache)"
	@echo "  make start          - Start all core services"
	@echo "  make stop           - Stop all core services"
	@echo "  make restart        - Restart all core services"
	@echo "  make reload         - Force rebuild and recreate containers (use after env changes)"
	@echo "  make logs           - View logs (use SVC=<service> for specific service)"
	@echo "  make config         - Check current configuration values"
	@echo "  make init-hasura    - Initialize Hasura metadata (safe, skips if exists)"
	@echo "  make force-init-hasura - Force reset Hasura metadata (WARNING: destructive)"
	@echo "  make status         - Show service status"
	@echo "  make ps             - List running services"
	@echo "  make clean          - Clean up volumes and containers"
	@echo ""
	@echo "Options:"
	@echo "  ENV=prod            - Use production configuration"
	@echo "  SVC=<service>       - Target specific service"
	@echo ""
	@echo "Examples:"
	@echo "  make start          - Start with dev config"
	@echo "  make start ENV=prod - Start with prod config"
	@echo "  make logs SVC=hasura - View hasura logs"
	@echo "  make reload         - Recreate after changing .env"

setup:
	@echo "🔧 Setting up Core Stack..."
	@if [ ! -f .env ]; then \
		echo "Creating .env from .env.example..."; \
		cp .env.example .env; \
		echo "✅ Created .env file. Please edit it with your configuration."; \
	else \
		echo "✅ .env file already exists."; \
	fi
	@echo ""
	@echo "📋 Checking prerequisites..."
	@command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed."; exit 1; }
	@command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose is required but not installed."; exit 1; }
	@command -v yarn >/dev/null 2>&1 || { echo "❌ Yarn is required but not installed."; exit 1; }
	@echo "✅ All prerequisites installed."
	@echo ""
	@echo "✅ Setup complete! Run 'make start' to launch the core stack."

build:
	@echo "🔨 Building core indexers..."
	@echo "  Using RPC: $${RPC_URLS}"
	@echo "  Using Chain ID: $${CHAIN_ID}"
	@echo "Checking if project.yaml files need regeneration..."
	@cd ../../indexers; \
	if [ ! -f consensus/project.yaml ] || \
	   [ ! -f files/project.yaml ] || \
	   ! grep -q "$${RPC_URLS}" consensus/project.yaml 2>/dev/null || \
	   ! grep -q "$${RPC_URLS}" files/project.yaml 2>/dev/null || \
	   ! grep -q "$${CHAIN_ID}" consensus/project.yaml 2>/dev/null || \
	   ! grep -q "$${CHAIN_ID}" files/project.yaml 2>/dev/null; then \
		echo "Environment variables changed or project.yaml missing - forcing regeneration..."; \
		rm -f consensus/project.yaml files/project.yaml; \
	fi
	@cd ../../indexers && \
		RPC_URLS="$${RPC_URLS}" CHAIN_ID="$${CHAIN_ID}" START_BLOCK_CONSENSUS="$${START_BLOCK_CONSENSUS}" START_BLOCK_FILES="$${START_BLOCK_FILES}" \
		yarn lerna run codegen --scope=consensus --scope=files
	@cd ../../indexers && \
		RPC_URLS="$${RPC_URLS}" CHAIN_ID="$${CHAIN_ID}" START_BLOCK_CONSENSUS="$${START_BLOCK_CONSENSUS}" START_BLOCK_FILES="$${START_BLOCK_FILES}" \
		yarn lerna run build --scope=consensus --scope=files || \
		(echo "⚠️  Lerna/Nx cache error occurred, but checking if build succeeded..." && \
		 if [ -f consensus/dist/index.js ] && [ -f files/dist/index.js ]; then \
			echo "✅ Build artifacts exist - continuing..."; \
		 else \
			echo "❌ Build failed - no artifacts found"; exit 1; \
		 fi)
	@echo "✅ Build complete!"

force-build:
	@echo "🔨 Force building core indexers (clearing cache and rebuilding)..."
	@echo "  Using RPC: $${RPC_URLS}"
	@echo "  Using Chain ID: $${CHAIN_ID}"
	@echo "Clearing all caches and generated files..."
	@cd ../../indexers && rm -rf .nx/cache node_modules/.cache consensus/project.yaml files/project.yaml consensus/dist files/dist
	@echo "Building consensus indexer..."
	@cd ../../indexers/consensus && \
		RPC_URLS="$${RPC_URLS}" CHAIN_ID="$${CHAIN_ID}" START_BLOCK_CONSENSUS="$${START_BLOCK_CONSENSUS}" \
		yarn codegen && yarn build
	@echo "Building files indexer..."
	@cd ../../indexers/files && \
		RPC_URLS="$${RPC_URLS}" CHAIN_ID="$${CHAIN_ID}" START_BLOCK_FILES="$${START_BLOCK_FILES}" \
		yarn codegen && yarn build
	@echo "✅ Force build complete!"

start: build
	@echo "🚀 Starting Core Stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) up -d
	@echo ""
	@echo "🔧 Initializing services..."
	@$(MAKE) init-hasura
	@echo ""
	@echo "✅ Core stack started!"
	@echo ""
	@echo "📊 Services:"
	@echo "  - Hasura GraphQL: http://localhost:8080"
	@echo "  - API: http://localhost:3030"
	@echo "  - PostgreSQL: localhost:5432"
	@echo "  - PGCat: localhost:6432"
	@echo ""
	@echo "Run 'make logs' to view logs or 'make status' to check status."

stop:
	@echo "🛑 Stopping Core Stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down
	@echo "✅ Core stack stopped."

restart: stop start

reload: force-build
	@echo "🔄 Reloading Core Stack (recreating containers)..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) up -d --force-recreate --remove-orphans
	@echo "✅ Core stack reloaded with new configuration!"

logs:
ifdef SVC
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) logs -f $(SVC)
else
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) logs -f
endif

config:
	@echo "📋 Checking Core Stack configuration..."
	@echo ""
	@echo "Environment values from .env:"
	@echo "  RPC_URLS: $${RPC_URLS:-not set}"
	@echo "  CHAIN_ID: $${CHAIN_ID:-not set}"
	@echo ""
	@echo "Docker Compose resolved configuration for consensus_indexer:"
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) config | sed -n '/consensus_indexer:/,/files_indexer:/p' | grep -E "ENDPOINT:|CHAIN_ID:" | sed 's/^      /  /'

init-hasura:
	@echo "🔧 Initializing Hasura metadata..."
	@echo "Waiting for Hasura to be ready..."
	@until curl -s http://localhost:8080/healthz >/dev/null 2>&1; do \
		echo "  Waiting for Hasura..."; \
		sleep 2; \
	done
	@echo "Checking if metadata already exists..."
	@if curl -s -X POST \
		http://localhost:8080/v1/metadata \
		-H "Content-Type: application/json" \
		-H "X-Hasura-Admin-Secret: $${HASURA_GRAPHQL_ADMIN_SECRET}" \
		-d '{"type": "export_metadata", "args": {}}' | grep -q '"sources":\s*\['; then \
		echo "✅ Hasura metadata already exists - skipping initialization"; \
	else \
		echo "Applying initial metadata..."; \
		curl -s -X POST \
			http://localhost:8080/v1/metadata \
			-H "Content-Type: application/json" \
			-H "X-Hasura-Admin-Secret: $${HASURA_GRAPHQL_ADMIN_SECRET}" \
			-d '{"type": "replace_metadata", "args": {"version": 3, "sources": [{"name": "default", "kind": "postgres", "configuration": {"connection_info": {"database_url": "postgres://'$${DB_USER}':'$${DB_PASSWORD}'@postgres:'$${DB_PORT}'/'$${DB_DATABASE}'", "isolation_level": "read-committed", "pool_settings": {"connection_lifetime": 600, "idle_timeout": 180, "max_connections": 50, "retries": 1}, "use_prepared_statements": true}}, "tables": []}]}}' | \
			grep -q '"message":"success"' && echo "✅ Hasura metadata initialized with database connection!" || echo "❌ Failed to initialize Hasura metadata"; \
	fi

force-init-hasura:
	@echo "🔧 Force resetting Hasura metadata..."
	@echo "⚠️  WARNING: This will remove ALL existing metadata, tables, and permissions!"
	@echo "Waiting for Hasura to be ready..."
	@until curl -s http://localhost:8080/healthz >/dev/null 2>&1; do \
		echo "  Waiting for Hasura..."; \
		sleep 2; \
	done
	@echo "Applying fresh metadata (this will replace everything)..."
	@curl -s -X POST \
		http://localhost:8080/v1/metadata \
		-H "Content-Type: application/json" \
		-H "X-Hasura-Admin-Secret: $${HASURA_GRAPHQL_ADMIN_SECRET}" \
		-d '{"type": "replace_metadata", "args": {"version": 3, "sources": [{"name": "default", "kind": "postgres", "configuration": {"connection_info": {"database_url": "postgres://'$${DB_USER}':'$${DB_PASSWORD}'@postgres:'$${DB_PORT}'/'$${DB_DATABASE}'", "isolation_level": "read-committed", "pool_settings": {"connection_lifetime": 600, "idle_timeout": 180, "max_connections": 50, "retries": 1}, "use_prepared_statements": true}}, "tables": []}]}}' | \
		grep -q '"message":"success"' && echo "✅ Hasura metadata reset with database connection!" || echo "❌ Failed to reset Hasura metadata"

status:
	@echo "📊 Core Stack Status:"
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) ps

ps:
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

clean:
	@echo "⚠️  WARNING: This will delete all data!"
	@echo "Press Ctrl+C to cancel, or Enter to continue."
	@read confirm
	@echo "🧹 Cleaning up core stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down -v
	@echo "✅ Clean complete." 