import { Entity } from "@backstage/catalog-model";
import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
} from "@backstage/core";
import { GkeusageApiClient, gkeusageApiRef } from "./api";
import { GKEMETERING_ANNOTATION_DATASET } from "./components/useGkeUsageMeteringAppData";

export const isGkeUsageMeteringAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[GKEMETERING_ANNOTATION_DATASET]);

export const entityContentRouteRef = createRouteRef({
  title: "GKE Usage Metering Entity Content",
});

export const gkeusagePlugin = createPlugin({
  id: "GKE Usage",
  apis: [
    createApiFactory({
      api: gkeusageApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new GkeusageApiClient({ discoveryApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityGKEUsageContent = gkeusagePlugin.provide(
  createRoutableExtension({
    component: () => import("./Router").then((m) => m.Router),
    mountPoint: entityContentRouteRef,
  })
);
