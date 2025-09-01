#!/bin/sh
set -e  # Exit on error

# Check if template exists
if [ ! -f /etc/pgcat/pgcat.toml.template ]; then
    echo "Error: pgcat.toml.template not found"
    exit 1
fi

# Generate PGCat config from template using sed
sed -e "s/\${DB_HOST}/${DB_HOST}/g" \
    -e "s/\${DB_PORT}/${DB_PORT}/g" \
    -e "s/\${DB_USER}/${DB_USER}/g" \
    -e "s/\${DB_PASSWORD}/${DB_PASSWORD}/g" \
    -e "s/\${DB_DATABASE}/${DB_DATABASE}/g" \
    /etc/pgcat/pgcat.toml.template > /etc/pgcat/pgcat.toml || {
    echo "Error: Failed to generate pgcat.toml"
    exit 1
}

# Start PGCat with the generated config
exec pgcat /etc/pgcat/pgcat.toml 