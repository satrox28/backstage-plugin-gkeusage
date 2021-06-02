import { createDevApp } from '@backstage/dev-utils';
import { gkeusagePlugin } from '../src/plugin';

createDevApp().registerPlugin(gkeusagePlugin).render();
