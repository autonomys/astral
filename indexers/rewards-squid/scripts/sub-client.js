const WebSocket = require('ws')
const { createClient } = require('graphql-ws');

const port = process.env.GQL_PORT || 4350
const host = process.env.GQL_HOST || 'localhost'
const proto = process.env.GQL_PROTO || 'ws'


const client = createClient({
  webSocketImpl: WebSocket,
  url: `${proto}://${host}:${port}/graphql`,
});

client.subscribe(
  {
    query: `
    subscription {
        operators(limit: 5, orderBy: updatedAt_DESC) {
            id
            signingKey
            operatorOwner
        }
    }  
    `,
  },
  {
    next: (data) => {
      console.log(`New operators: ${JSON.stringify(data)}`);
    },
    error: (error) => {
      console.error('error', error);
    },
    complete: () => {
      console.log('done!');
    },
  }
);