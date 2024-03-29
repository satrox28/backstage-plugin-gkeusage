# Backstage GKE Usage plugin 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BESTSELLER_backstage-plugin-gkeusage&metric=alert_status)](https://sonarcloud.io/dashboard?id=BESTSELLER_backstage-plugin-gkeusage)
![npm](https://img.shields.io/npm/dt/@bestsellerit/backstage-plugin-gkeusage)

Welcome to the gkeusage backend plugin!
This plugin will show you the cost and resource usage of your application within GKE 

![GKE USage](gkeusage.png)

## Getting started
### Enabled GKE usage metering
Documentation on how to enable GKE usage metering can be found [here](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-usage-metering#enabling)

### Create GPC service account 
Create a GPC service account with BigQuery Data Viewer and BigQuery Job User permissions to your service project. Documentation can be found it [here](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)

### Enabling frontend 
```bash
cd package/app
yarn add @bestsellerit/backstage-plugin-gkeusage
```
```ts
// packages/app/src/plugins.ts
export { plugin as gkeusage } from '@bestsellerit/backstage-plugin-gkeusage';
```
```ts
// packages/app/src/components/catalog/EntityPage.tsx
import { EntityGKEUsageContent } from '@bestsellerit/backstage-plugin-gkeusage';

const serviceEntityPage = (
  <EntityPageLayout>
    // ...
    <EntityLayout.Route path="/gkeusage" title="GKE Usage">
      <EntityGKEUsageContent />
    </EntityLayout.Route>
  </EntityPageLayout>
)
```
### Enabling backend

```bash
cd packages/backend
yarn add @bestsellerit/backstage-plugin-gkeusage-backend
```

Create a new file named `packages/backend/src/plugins/gkeusage.ts`, and add the following to it

```ts
import { createRouter } from '@bestsellerit/backstage-plugin-gkeusage-backend';
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
  apiRouter.use('/gkeusage', await gkeusage(gkeusageEnv));

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

## Contributing
Everyone is welcome to contribute to this repository. Feel free to rase [issues](https://github.com/BESTSELLER/backstage-plugin-gkeusage/issues) or to submit [Pull Requests.](https://github.com/BESTSELLER/backstage-plugin-gkeusage/pulls)
