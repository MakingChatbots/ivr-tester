import { expect, test, vi } from 'vitest';
import { CloudflareTunnelMetricsClient } from './CloudflareTunnelMetricsClient.js';

function mockFetch(body: string) {
  return vi.fn<typeof fetch>().mockResolvedValue(new Response(body));
}

test('extracts hostname', async () => {
  const fetchFn = mockFetch(`
# HELP cloudflared_tunnel_user_hostnames_counts Which user hostnames cloudflared is serving
# TYPE cloudflared_tunnel_user_hostnames_counts counter
cloudflared_tunnel_user_hostnames_counts{userHostname="https://test-hostname.trycloudflare.com"} 1`);

  const client = new CloudflareTunnelMetricsClient('http://localhost', fetchFn);

  await expect(client.getHostname()).resolves.toStrictEqual(
    'https://test-hostname.trycloudflare.com',
  );
  expect(fetchFn).toHaveBeenCalledWith('http://localhost/metrics');
});

test('extracts total connections', async () => {
  const fetchFn = mockFetch(`
# HELP quic_client_total_connections Number of connections initiated. For all quic metrics, client means the side initiating the connection
# TYPE quic_client_total_connections counter
quic_client_total_connections 3`);

  const client = new CloudflareTunnelMetricsClient('http://localhost', fetchFn);

  await expect(client.getConnectionsCount()).resolves.toStrictEqual({
    closedConnections: undefined,
    totalConnections: 3,
  });
});

test('extracts closed connections', async () => {
  const fetchFn = mockFetch(`
# HELP quic_client_closed_connections Number of connections that has been closed
# TYPE quic_client_closed_connections counter
quic_client_closed_connections 4`);

  const client = new CloudflareTunnelMetricsClient('http://localhost', fetchFn);

  await expect(client.getConnectionsCount()).resolves.toStrictEqual({
    closedConnections: 4,
    totalConnections: undefined,
  });
});
