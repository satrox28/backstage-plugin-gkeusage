import { TableColumn } from '@backstage/core-components';

export const columns: TableColumn[] = [
  {
    field: 'cpu',
    title: 'CPU Cost',
  },
  {
    field: 'memory',
    title: 'Memory Cost',
  },
  {
    field: 'network',
    title: 'Network Cost',
  },
  {
    field: 'storage',
    title: 'Storage Cost',
  },
  {
    field: 'gpu',
    title: 'GPU Cost',
  },
  {
    field: 'total',
    title: 'Total Cost',
  },
];
