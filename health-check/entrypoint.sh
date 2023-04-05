#!/bin/sh
if [ "$1" = "postgres" ]; then
  echo "Starting Postgres health check"
  node dist/pg.js
elif [ "$1" = "prometheus" ]; then
  echo "Starting health check for a service with Prometheus"
  node dist/prometheus.js
else
  echo "You have to specify type of service: 'pg' or 'prometheus'"
fi
