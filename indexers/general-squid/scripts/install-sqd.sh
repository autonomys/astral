#! /bin/bash

set -e

if ! command -v sqd &> /dev/null; then
    echo "sqd is required but not installed. Proceeding with the rest of the script..."
else
    NODE_VERSION=20.11.1

    mkdir -p ~/{opt,src,bin}
    cd ~/src
    wget -S https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
    tar xvf node-v${NODE_VERSION}-linux-x64.tar.xz -C ~/opt

    cd ~/bin
    ln -s ~/opt/node-v${NODE_VERSION}-linux-x64/bin/node node
    ln -s ~/opt/node-v${NODE_VERSION}-linux-x64/bin/npm npm
    ln -s ~/opt/node-v${NODE_VERSION}-linux-x64/bin/npx npx

    npm i -g @subsquid/cli@latest

    ln -s ~/opt/node-v${NODE_VERSION}-linux-x64/bin/sqd sqd

    echo "export PATH=$HOME/bin:$PATH" >> ~/.bash_profile
    echo 'export NODE_OPTIONS="--max-old-space-size=4096"' >> ~/.bash_profile

    cd ~/
    git clone https://github.com/autonomys/astral.git

    ln -s astral/general-squid general-squid

    cd general-squid
    npm ci
    sqd up
    sqd build
    cp -rf .env.sample .env
    export NODE_OPTIONS="--max-old-space-size=4096"
    nohup sqd run -f .env . &
fi
