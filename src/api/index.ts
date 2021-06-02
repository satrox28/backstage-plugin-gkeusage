import { createApiRef, DiscoveryApi } from '@backstage/core';

export interface gkeusageApi {}

export const gkeusageApiRef = createApiRef<gkeusageApi>({
  id: 'plugin.gkeusage.service',
  description: 'Used by the GKEUsage plugin to make requests',
});

export type Options = {
  discoveryApi: DiscoveryApi;
  proxyPath?: string;
};

export class gkeusageApiClient implements gkeusageApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
  }
}
