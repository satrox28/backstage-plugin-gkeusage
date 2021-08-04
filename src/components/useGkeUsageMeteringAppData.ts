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
 *
 * limitations under the License.
 */

import { Entity } from "@backstage/catalog-model";

export const GKEMETERING_ANNOTATION_DATASET = "gkeusage/dataset";
export const GKEMETERING_ANNOTATION_NAMESPACE = "gkeusage/namespace";
export const GKEMETERING_ANNOTATION_LABEL = "gkeusage/label";

export const useGkeUsageMeteringAppData = ({ entity }: { entity: Entity }) => {
  const dataset =
    entity?.metadata.annotations?.[GKEMETERING_ANNOTATION_DATASET] ?? "";
  const namespace =
    entity?.metadata.annotations?.[GKEMETERING_ANNOTATION_NAMESPACE] ??
    "default";
  const label =
    entity?.metadata.annotations?.[GKEMETERING_ANNOTATION_LABEL] ?? "";

  if (!dataset && !namespace && !label) {
    throw new Error("'gke usage metering' annotations are missing");
  }
  return { dataset, namespace, label };
};
