#!/bin/sh
set -e

# Generate PGCat config from template using sed
# Replace environment variables in the template
sed -e "s/\${DB_HOST}/${DB_HOST}/g" \
    -e "s/\${DB_PORT}/${DB_PORT}/g" \
    -e "s/\${DB_USER}/${DB_USER}/g" \
    -e "s/\${DB_PASSWORD}/${DB_PASSWORD}/g" \
    -e "s/\${DB_DATABASE}/${DB_DATABASE}/g" \
    /etc/pgcat/pgcat.toml.template > /etc/pgcat/pgcat.toml

# Start PGCat with the generated config
exec pgcat /etc/pgcat/pgcat.toml 