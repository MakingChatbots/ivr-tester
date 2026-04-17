/**
 * Utility functions for extracting values from Cloudflare Tunnel's metrics
 * endpoint.
 *
 * The endpoint's format follows Prometheus's data model
 * @see https://prometheus.io/docs/concepts/data_model/
 */
export class CloudflareTunnelMetricsClient {
  public constructor(
    private readonly baseUrl: string,
    private readonly fetchFn: typeof fetch = fetch,
  ) {}

  private async requestMetrics(): Promise<string> {
    const response = await this.fetchFn(`${this.baseUrl}/metrics`);
    return response.text();
  }

  private static getClosedConnections(metrics: string): number | undefined {
    const match = metrics.match(/quic_client_closed_connections (\d+)/);
    return match ? parseInt(match[1]) : undefined;
  }

  private static getTotalConnections(metrics: string): number | undefined {
    const match = metrics.match(/quic_client_total_connections (\d+)/);
    return match ? parseInt(match[1]) : undefined;
  }

  public async getConnectionsCount(): Promise<{
    closedConnections: number | undefined;
    totalConnections: number | undefined;
  }> {
    const metrics = await this.requestMetrics();
    return {
      closedConnections: CloudflareTunnelMetricsClient.getClosedConnections(metrics),
      totalConnections: CloudflareTunnelMetricsClient.getTotalConnections(metrics),
    };
  }

  public async getHostname(): Promise<string | undefined> {
    const metrics = await this.requestMetrics();

    const match = metrics.match(
      /cloudflared_tunnel_user_hostnames_counts\{userHostname="(.+?)"} \d+/,
    );
    return match?.[1];
  }
}
