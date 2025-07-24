#!/bin/sh
set -e

# Generate PGCat config from template using sed
# Replace environment variables in the template
sed -e "s/\${STAKING_DB_USER}/${STAKING_DB_USER}/g" \
    -e "s/\${STAKING_DB_PASSWORD}/${STAKING_DB_PASSWORD}/g" \
    -e "s/\${STAKING_DB_DATABASE}/${STAKING_DB_DATABASE}/g" \
    /etc/pgcat/pgcat.toml.template > /etc/pgcat/pgcat.toml

# Start PGCat with the generated config
exec pgcat /etc/pgcat/pgcat.toml 