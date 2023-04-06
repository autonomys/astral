import { ServerResponse, createServer } from 'http';
import * as dotenv from 'dotenv';
import { exec } from 'child_process';
import { secureCompare } from './utils';

dotenv.config();

function checkIsPostgresReady() {
  const command = `pg_isready -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT}`;
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }
      const ready = stdout.includes('accepting connections');
      resolve(ready);
    });
  });
}

async function checkPostgresHealth(res: ServerResponse) {
  try {
    const isReady = await checkIsPostgresReady();

    if (isReady) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
}

const server = createServer(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];
    const isTokenValid = secureCompare(token, process.env.HEALTH_CHECK_TOKEN);

    if (isTokenValid) {
      if (req.url === '/health') {
        await checkPostgresHealth(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    } else {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized');
    }
  } else {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  }
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Postgres health check server running at http://localhost:${port}/`);
});
