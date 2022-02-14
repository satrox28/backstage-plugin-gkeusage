import { createApiRef, DiscoveryApi } from "@backstage/core-plugin-api";

export interface gkeusageApi {}

export const gkeusageApiRef = createApiRef<gkeusageApi>({
  id: "plugin.gkeusage.service",
});

export type Options = {
  discoveryApi: DiscoveryApi;
  proxyPath?: string;
};

export class GkeusageApiClient implements gkeusageApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
  }
}
