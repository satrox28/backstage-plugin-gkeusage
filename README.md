# Backstage GKE Usage plugin 

Welcome to the gkeusage plugin!

## Getting started
### Enabled GKE usage metering
Documentation on how to enable GKE usage metering can be found [here](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-usage-metering#enabling)

### Create GPC service account 
Create a GPC service account with BigQuery Data Viewer and BigQuery Job User permissions to your service project. Documentation can be found it [here](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)

### Enabling frontend 
```bash
cd package/app
yarn add @bestseller/backstage-plugin-gkeusge
```
```ts
// packages/app/src/plugins.ts
export { plugin as gkeusage } from '@bestseller/backstage-plugin-gkeusage';
```
```ts
// packages/app/src/components/catalog/EntityPage.tsx
import { Router as GKEUsageRouter } from '@bestseller/backstage-plugin-gkeusage';

const serviceEntityPage = (
// ...
  <EntityPageLayout>
    <EntityPageLayout.Content
      path="/gkeusage/*"
      title="GKE Usage"
      element={<GKEUsageRouter entity={entity} />}
    />
  </EntityPageLayout>
)
```
### Enabling backend

```bash
cd packages/backend
yarn add @bestseller/backstage-plugin-gkeusage-backend
```

Create a new file named `packages/backend/src/plugins/gkeusage.ts`, and add the following to it

```ts
import { createRouter } from '@internal/backstage-plugin-gkeusage-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin({
  logger,
  config,
}: PluginEnvironment): Promise<Router> {
  return await createRouter({ logger, config });
}
```

And finally, wire this into the overall backend router. Edit `packages/backend/src/index.ts`

```ts
import gkeusage from './plugins/gkeusage';
// ...
async function main() {
  // ...
  const gkeusageEnv = useHotMemoize(module, () => createEnv('gkeusage'));
  apiRouter.use('/gkeusage', await carmen(gkeusageEnv));

```


## Configuration
The plugin requires configuration in the Backstage app-config.yaml to connect googles bigquery API.

```yaml
gkeUsage:
  billingTable: billingProjectId.billingDataSetId.billingTableId
  google_application_credentials: 
    $env: GOOGLE_APPLICATION_CREDENTIALS

```

Adding annotations and values to your component file.
```yaml
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: sample-system
  description: "A sample system"
  annotations:
    gkeusage/dataset: projectID.Dataset
    gkeusage/namespace: default
    gkeusage/label: 'app:app-name'
```