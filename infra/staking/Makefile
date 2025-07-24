.PHONY: help setup build force-build start stop restart reload logs status clean ps config

# Load .env file if it exists
ifneq (,$(wildcard .env))
    include .env
    export
endif

# Default environment
ENV ?= dev
COMPOSE_FILE := docker-compose.yml
COMPOSE_PROJECT := astral-staking

# Set compose files based on environment
ifeq ($(ENV),prod)
    COMPOSE_FILE := docker-compose.yml -f docker-compose.prod.yml
endif

# Default target
help:
	@echo "Astral Staking Stack Commands:"
	@echo ""
	@echo "  make setup          - Initial setup and environment check"
	@echo "  make build          - Build staking services (uses cache)"
	@echo "  make force-build    - Build services (bypasses cache)"
	@echo "  make start          - Start all staking services"
	@echo "  make stop           - Stop all staking services"
	@echo "  make restart        - Restart all staking services"
	@echo "  make reload         - Force rebuild and recreate containers (use after env changes)"
	@echo "  make logs           - View logs (use SVC=<service> for specific service)"
	@echo "  make config         - Check current configuration values"
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
	@echo "  make logs SVC=staking_worker - View staking worker logs"
	@echo "  make reload         - Recreate after changing .env"

setup:
	@echo "🔧 Setting up Staking Stack..."
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
	@echo "✅ Setup complete! Run 'make start' to launch the staking stack."

# Build all services
build:
	@echo "🔨 Building staking infrastructure services..."
	@if [ -f .env ]; then \
		echo "📋 Loading environment variables from .env"; \
		export $$(grep -v '^#' .env | xargs); \
	fi
	@echo "🧹 Clearing build caches to ensure fresh builds..."
	@cd ../../indexers && yarn cache clean --all || true
	@cd ../../indexers && npx lerna clean --yes || true  
	@cd ../../indexers && rm -rf .nx || true
	@cd ../../indexers/staking && rm -f project.yaml || true
	@echo "📦 Reinstalling workspace dependencies..."
	@cd ../../indexers && yarn install || { echo "❌ Dependency installation failed"; exit 1; }
	@echo "🔄 Regenerating project configurations with current environment..."
	@cd ../../indexers/staking && yarn codegen || { echo "❌ Staking codegen failed"; exit 1; }
	@echo "🔨 Building staking indexer and worker..."
	@cd ../../indexers && yarn lerna run build --scope=staking --scope=staking-worker || { echo "❌ Staking build failed - this may be due to cache issues, continuing..."; }
	@echo "🐳 Building Docker images..."
	@docker compose build || { echo "❌ Docker build failed"; exit 1; }
	@echo "✅ Build completed successfully!"

# Force rebuild everything (clears all caches)
force-build:
	@echo "🔨 Force building all services (clearing all caches)..."
	@if [ -f .env ]; then \
		echo "📋 Loading environment variables from .env"; \
		export $$(grep -v '^#' .env | xargs); \
	fi
	@echo "🧹 Clearing all build caches..."
	@cd ../../indexers && yarn cache clean --all || true
	@cd ../../indexers && npx lerna clean --yes || true  
	@cd ../../indexers && rm -rf .nx || true
	@cd ../../indexers && rm -rf node_modules || true
	@cd ../../indexers/staking && rm -rf node_modules dist .subql_codegen project.yaml || true
	@cd ../../indexers/workers/staking-worker && rm -rf node_modules dist || true
	@echo "📦 Reinstalling dependencies..."
	@cd ../../indexers && yarn install || { echo "❌ Dependency installation failed"; exit 1; }
	@echo "🔄 Regenerating project configurations..."
	@cd ../../indexers/staking && yarn codegen || { echo "❌ Staking codegen failed"; exit 1; }
	@echo "🔨 Building staking indexer and worker..."
	@cd ../../indexers && yarn lerna run build --scope=staking --scope=staking-worker || { echo "❌ Staking build failed"; exit 1; }
	@echo "🐳 Building Docker images..."
	@docker compose build --no-cache || { echo "❌ Docker build failed"; exit 1; }
	@echo "✅ Force build completed successfully!"

start: build
	@echo "🚀 Starting Staking Stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) up -d
	@echo ""
	@echo "✅ Staking stack started!"
	@echo ""
	@echo "📊 Services:"
	@echo "  - Staking PostgreSQL: localhost:5433"
	@echo "  - Staking PGCat: localhost:6433"
	@echo "  - Staking Indexer: http://localhost:3002"
	@echo ""
	@echo "Run 'make logs' to view logs or 'make status' to check status."

stop:
	@echo "🛑 Stopping Staking Stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down
	@echo "✅ Staking stack stopped."

restart: stop start

reload: force-build
	@echo "🔄 Reloading Staking Stack (recreating containers)..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) up -d --force-recreate --remove-orphans
	@echo "✅ Staking stack reloaded with new configuration!"

logs:
ifdef SVC
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) logs -f $(SVC)
else
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) logs -f
endif

config:
	@echo "📋 Checking Staking Stack configuration..."
	@echo ""
	@echo "Environment values from .env:"
	@echo "  RPC_URLS: $${RPC_URLS:-not set}"
	@echo "  CHAIN_ID: $${CHAIN_ID:-not set}"
	@echo "  STAKING_DB_DATABASE: $${STAKING_DB_DATABASE:-not set}"
	@echo ""
	@echo "Docker Compose resolved configuration for staking_indexer:"
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) config | sed -n '/staking_indexer:/,/staking_worker:/p' | grep -E "ENDPOINT:|CHAIN_ID:" | sed 's/^      /  /'

status:
	@echo "📊 Staking Stack Status:"
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) ps

ps:
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

clean:
	@echo "⚠️  WARNING: This will delete all staking data!"
	@echo "Press Ctrl+C to cancel, or Enter to continue."
	@read confirm
	@echo "🧹 Cleaning up staking stack..."
	@docker-compose -p $(COMPOSE_PROJECT) -f $(COMPOSE_FILE) down -v
	@echo "✅ Clean complete." 