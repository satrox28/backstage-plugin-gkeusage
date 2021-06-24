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
import { useEntity } from '@backstage/plugin-catalog-react';
import { MissingAnnotationEmptyState } from '@backstage/core';
import React from 'react';
import { Route, Routes } from 'react-router';
import { GKEUsageDashboardPage } from './components/GKEUsageDashboardPage';
import { GKEMETERING_ANNOTATION_DATASET } from './components/useGkeUsageMeteringAppData';
import { isGkeUsageMeteringAvailable } from './plugin';

export const Router = () => {
  const { entity } = useEntity();
  return !isGkeUsageMeteringAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={GKEMETERING_ANNOTATION_DATASET} />
  ) : (
    <Routes>
      <Route path="/" element={<GKEUsageDashboardPage entity={entity} />} />
    </Routes>
  );
};
