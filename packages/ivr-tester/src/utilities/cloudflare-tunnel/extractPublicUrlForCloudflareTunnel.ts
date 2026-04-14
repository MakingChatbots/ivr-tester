import { setTimeout } from 'node:timers/promises';
import { CloudflareTunnelMetricsClient } from './CloudflareTunnelMetricsClient.js';

export async function extractPublicUrlForCloudflareTunnel(
  metricsBaseUrl = 'http://127.0.0.1:8081',
  { maxAttempts = 10, delayMs = 1000 } = {},
): Promise<string> {
  const client = new CloudflareTunnelMetricsClient(metricsBaseUrl);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log('Attempt number', attempt);

    const { closedConnections, totalConnections } = await client.getConnectionsCount();

    if (closedConnections === undefined || totalConnections === undefined) {
      console.log('Connection counts not defined');
      await setTimeout(delayMs);
      continue;
    }

    if (closedConnections >= totalConnections) {
      console.log(
        `closedConnections: ${closedConnections} >= totalConnections: ${totalConnections}`,
      );
      await setTimeout(delayMs);
      continue;
    }

    const publicUrl = await client.getHostname();
    if (!publicUrl) {
      console.log('Could not find get public URL');
      await setTimeout(delayMs);
      continue;
    }

    return publicUrl;
  }

  throw new Error(`Failed to extract public URL after ${maxAttempts} attempts`);
}
