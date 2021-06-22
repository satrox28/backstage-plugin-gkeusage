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

import { Entity } from "@backstage/catalog-model";
import { InfoCard } from "@backstage/core";
import React, { useState } from "react";
import Select from "react-select";
import { useGkeUsageMeteringAppData } from "./useGkeUsageMeteringAppData";
import { GKECost } from "./GKEUsageCost";
import { GKEConsumption } from "./GKEUsageConsumption";
// import { GKEEfficiency } from './GKEUsageEfficiency'
import { Card } from "@material-ui/core";
import { options } from "./data";

export const GKEUsageDashboardPage = ({ entity }: { entity: Entity }) => {
  const { dataset } = useGkeUsageMeteringAppData({ entity });
  const { namespace } = useGkeUsageMeteringAppData({ entity });
  const { label } = useGkeUsageMeteringAppData({ entity });

  const data = dataset.split(".");
  const keyvalue = label.split(":");

  let backendUrl = window.location.origin;
  if (backendUrl.includes("3000")) {
    backendUrl = backendUrl.replace("3000", "7000");
  }

  const queryStr = `projectid=${data[0]}&dataset=${data[1]}&labelKey=${keyvalue[0]}&labelValue=${keyvalue[1]}&namespace=${namespace}`;

  const costUrl = `${backendUrl}/api/gkeusage/cost?${queryStr}`;
  const usageUrl = `${backendUrl}/api/gkeusage/usage?${queryStr}`;

  const [days, setDays] = useState(options[3]);
  const onchangeSelect = (item: any) => {
    setDays(item);
  };

  return (
    <InfoCard title="GKE Usage Dashboard">
      <Select defaultValue={days} onChange={onchangeSelect} options={options} />
      <Card>
        <GKECost url={costUrl} maxAge={days.value} />
      </Card>
      <p />
      <Card>
        <p />
        <GKEConsumption url={usageUrl} maxAge={days.value} />
      </Card>
      {/* <p></p>
      <Card title="Efficiency">
        <GKEEfficiency usageUrl={usageUrl} costUrl={url}/>
      </Card> */}
    </InfoCard>
  );
};
