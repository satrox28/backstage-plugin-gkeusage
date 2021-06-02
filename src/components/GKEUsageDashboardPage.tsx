/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Entity } from '@backstage/catalog-model';
import { InfoCard } from '@backstage/core';
import React from 'react';
import { useGkeUsageMeteringAppData } from './useGkeUsageMeteringAppData';
import { GKECost } from './GKEUsageCost';
import { GKEConsumption } from './GKEUsageConsumption';
// import { GKEEfficiency } from './GKEUsageEfficiency'
import { Card } from '@material-ui/core';

// import { Button } from '@material-ui/core';

export const GKEUsageDashboardPage = ({ entity }: { entity: Entity }) => {
  const { dataset } = useGkeUsageMeteringAppData({ entity });
  const { namespace } = useGkeUsageMeteringAppData({ entity });
  const { label } = useGkeUsageMeteringAppData({ entity });

  const data = dataset.split('.');
  const keyvalue = label.split(':');

  const backendUrl = 'http://localhost:7000';
  const url =
    backendUrl +
    '/api/gkeusage/cost?projectid=' +
    data[0] +
    '&dataset=' +
    data[1] +
    '&labelKey=' +
    keyvalue[0] +
    '&labelValue=' +
    keyvalue[1] +
    '&namespace=' +
    namespace;

  const usageUrl =
    backendUrl +
    '/api/gkeusage/usage?projectid=' +
    data[0] +
    '&dataset=' +
    data[1] +
    '&labelKey=' +
    keyvalue[0] +
    '&labelValue=' +
    keyvalue[1] +
    '&namespace=' +
    namespace;

  return (
    <InfoCard title="GKE Usage Dashboard" subheader="last 30 days">
      <Card>
        <GKECost url={url} />
      </Card>
      <p></p>
      <Card>
      <p></p>
        <GKEConsumption url={usageUrl} />
      </Card>
      {/* <p></p>
      <Card title="Efficiency">
        <GKEEfficiency usageUrl={usageUrl} costUrl={url}/>
      </Card> */}
    </InfoCard>
  );
};
