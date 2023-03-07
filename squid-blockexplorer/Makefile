process: migrate
	@node -r dotenv/config lib/processor.js

build:
	@npm run build

build-processor-image:
	@docker build . --target processor -t squid-processor

build-query-node-image:
	@docker build . --target query-node -t query-node

build-images: build-processor-image build-query-node-image

serve:
	@npx squid-graphql-server --max-root-fields 10 --max-response-size 5000

migrate:
	@npx squid-typeorm-migration apply

codegen:
	@npx squid-typeorm-codegen

typegen:
	@npx squid-substrate-typegen typegen.json

up:
	@docker-compose up -d

down:
	@docker-compose down

make devnet-up:
	@docker-compose -f devnet/docker-compose.yml up -d

make devnet-down:
	@docker-compose -f devnet/docker-compose.yml down && rm -rf devnet/node-data/* && rm -rf devnet/farmer-data/*

make devnet-logs:
	@docker-compose -f devnet/docker-compose.yml logs -f

.PHONY: build serve process migrate codegen typegen up down
