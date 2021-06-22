export const options = [
  {
    label: 'last 1 days',
    value: '1',
  },
  {
    label: 'last 7 days',
    value: '7',
  },
  {
    label: 'last 14 days',
    value: '14',
  },
  {
    label: 'last 30 days',
    value: '30',
  },
  {
    label: 'last 60 days',
    value: '60',
  },
];

export const columns = [
  {
    name: 'CPU Cost',
    selector: 'cpu',
  },
  {
    name: 'Memory Cost',
    selector: 'memory',
  },
  {
    name: 'Network Cost',
    selector: 'network',
  },
  {
    name: 'Storage Cost',
    selector: 'storage',
  },
  {
    name: 'GPU Cost',
    selector: 'gpu',
  },
  {
    name: 'Total Cost',
    selector: 'total',
  },
];
