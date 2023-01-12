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

make local-archive-up:
	@docker-compose -f local-archive/docker-compose.yml up -d 

make local-archive-down:
	@docker-compose -f local-archive/docker-compose.yml down

.PHONY: build serve process migrate codegen typegen up down
