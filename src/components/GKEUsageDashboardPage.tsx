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
import { InfoCard } from "@backstage/core-components";
import React, { useState } from "react";
import { useGkeUsageMeteringAppData } from "./useGkeUsageMeteringAppData";
import { GKECost } from "./GKEUsageCost";
import { GKEConsumption } from "./GKEUsageConsumption";
import {
  Card,
  Button,
  Grid,
  MuiThemeProvider,
  Select,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { BackstageTheme } from "@backstage/theme";

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

  const [days, setDays] = useState("30");
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setDays(event.target.value);
  };

  const handleClick = () => {
    window.open(
      "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    );
  };

  const theme = useTheme<BackstageTheme>();
  const mode = theme.palette.type === "dark" ? "dark" : "light";

  return (
    <InfoCard title="GKE Usage Dashboard">
      <MuiThemeProvider theme={mode}>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={2}>
            <Select defaultValue={days} onChange={handleChange} value={days}>
              <MenuItem value={1}>last 1 Day</MenuItem>
              <MenuItem value={7}>last 7 Days</MenuItem>
              <MenuItem value={14}>last 14 Days</MenuItem>
              <MenuItem value={30}>last 30 Days</MenuItem>
              <MenuItem value={60}>last 60 Days</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Button endIcon={<LinkIcon />} onClick={handleClick}>
              How to manage Resources
            </Button>
          </Grid>
        </Grid>
        <p />
        <Card>
          <GKECost url={costUrl} maxAge={days} />
        </Card>
        <p />
        <Card>
          <p />
          <GKEConsumption url={usageUrl} maxAge={days} />
        </Card>
      </MuiThemeProvider>
    </InfoCard>
  );
};
