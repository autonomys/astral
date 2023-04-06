import { ServerResponse, createServer } from 'http';
import { register, Gauge, collectDefaultMetrics } from 'prom-client';
import * as dotenv from 'dotenv';
import { request } from 'undici';
import { secureCompare } from './utils';

dotenv.config();

const serviceHealth = new Gauge({
  name: 'service_health',
  help: 'Health status of a service using Prometheus metrics',
});

const prometheusUrl = `${process.env.PROMETHEUS_HOST}/metrics`;

let lastProcessedBlock = 0;

async function updateHealth() {
  try {
    const response = await request(prometheusUrl);
    const text = await response.body.text();
    // Regex for services:
    // `ingest`: sqd_last_block
    // `processor`: sqd_processor_last_block
    const regex = new RegExp('sqd_(?:last_block|processor_last_block) (\\d+)');
    const match = regex.exec(text);

    // If the regex matches and the block number is greater than the last processed block, set the service health metric to 1
    if (match && lastProcessedBlock < Number(match[1])) {
      serviceHealth.set(1);
      lastProcessedBlock = Number(match[1]);
    }
  } catch (error) {
    console.error(error);
    // If the request fails, set the service health metric to 0
    serviceHealth.set(0);
  }
}

async function checkHealth(res: ServerResponse) {
  const isHealthy = (await serviceHealth.get()).values[0].value === 1;

  if (isHealthy) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
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
        await checkHealth(res);
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

register.registerMetric(serviceHealth);
collectDefaultMetrics();
// check if Ingest service is healthy right now and every 10 seconds
updateHealth();
setInterval(updateHealth, 10000);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Prometheus service health check server running at http://localhost:${port}/`);
});
