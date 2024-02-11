# Health Check

[Astral](../README.md)

Utility to check health status of an internal service and expose it as a REST API endpoint. Currently supports following services:

- Postgres
- Services using Prometheus metrics:
  - `ingest` (Archive)
  - `processor` (Squid)

## Available scripts

- `prometheus` - start health check server for a service using Prometheus metrics
- `pg` - start health check server for `pg` service
- `build` - transpile TypeScript to ES6
- `lint` - check codebase using ESLint

## Running as Docker container

Example `docker-compose.yml` including `health-check` services for Postgres and service with Prometheus:

```yml
version: "3.7"

services:
  pg-health-check:
    image: ghcr.io/subspace/health-check:latest
    environment:
      POSTGRES_HOST: db
      POSTGRES_PORT: 5432
      PORT: 8080
      # provide secret, which is going to be used in 'Authorization' header
      SECRET: MY_SECRET
    command: "postgres"
    ports:
      - 8080:8080

  prom-health-check:
    image: ghcr.io/subspace/health-check:latest
    environment:
      # assuming we're running `ingest` service within same docker-compose.yml
      PROMETHEUS_HOST: http://ingest:9090
      PORT: 7070
      # provide secret, which is going to be used in 'Authorization' header
      SECRET: MY_SECRET
    command: "prometheus"
    ports:
      - 7070:7070
```
