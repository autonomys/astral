#!/bin/sh
set -e  # Exit on error

# Check if template exists
if [ ! -f /etc/pgcat/pgcat.toml.template ]; then
    echo "Error: pgcat.toml.template not found"
    exit 1
fi

# Generate PGCat config from template using sed
sed -e "s/\${STAKING_DB_HOST}/${STAKING_DB_HOST}/g" \
    -e "s/\${STAKING_DB_PORT}/${STAKING_DB_PORT}/g" \
    -e "s/\${STAKING_DB_USER}/${STAKING_DB_USER}/g" \
    -e "s/\${STAKING_DB_PASSWORD}/${STAKING_DB_PASSWORD}/g" \
    -e "s/\${STAKING_DB_DATABASE}/${STAKING_DB_DATABASE}/g" \
    /etc/pgcat/pgcat.toml.template > /etc/pgcat/pgcat.toml || {
    echo "Error: Failed to generate pgcat.toml"
    exit 1
}

# Start PGCat with the generated config
exec pgcat /etc/pgcat/pgcat.toml 