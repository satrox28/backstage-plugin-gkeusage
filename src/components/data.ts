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

export function getTheme() {
  const localTheme = window.localStorage.getItem("theme");
  let theme: any = "light";
  if (localTheme === "dark") {
    theme = localTheme;
  }

  const newTheme = createTheme({
    palette: { type: theme },
  });

  return newTheme;
}
