import { createTheme } from "@material-ui/core/styles";

interface Column {
  name: string;
  label: string;
}

export const columns: Column[] = [
  {
    name: "cpu",
    label: "CPU Cost",
  },
  {
    name: "memory",
    label: "Memory Cost",
  },
  {
    name: "network",
    label: "Network Cost",
  },
  {
    name: "storage",
    label: "Storage Cost",
  },
  {
    name: "gpu",
    label: "GPU Cost",
  },
  {
    name: "total",
    label: "Total Cost",
  },
];

