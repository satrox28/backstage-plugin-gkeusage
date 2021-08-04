import React, { useEffect, useState } from "react";
import { columns } from "./data";
import getSymbolFromCurrency from "currency-symbol-map";
import MUIDataTable from "mui-datatables";

export function GKECost(props: CostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cost, setCost] = useState<ResourceCost>({
    cpu: "",
    memory: "0",
    network: "0",
    storage: "0",
    gpu: "0",
    total: "0",
  });

  useEffect(() => {
    setLoading(false);
    async function getCost() {
      const response = await fetch(`${props.url}&maxAge=${props.maxAge}`);
      const json = await response.json();

      if (json.hasOwnProperty("error")) {
        setError(true);
        setErrorMsg(json.error.message);
      }

      let memoryCost = 0;
      let cpuCost = 0;
      let networkCost = 0;
      let storageCost = 0;
      let gpuCost = 0;

      json.forEach(async (value: { resource_name: any; cost: number }) => {
        switch (value.resource_name) {
          case "cpu":
            cpuCost += value.cost;
            console.log(cpuCost);
            break;
          case "memory":
            memoryCost += value.cost;
            break;
          case "storage":
            storageCost += value.cost;
            break;
          case "networkEgress":
            networkCost += value.cost;
            break;
          case "gpu":
            gpuCost += value.cost;
            break;
          default:
            break;
        }
      });

      const currency: string | undefined = getSymbolFromCurrency(
        await json[0].currency
      );

      const totalCost =
        Math.round(
          (memoryCost + cpuCost + networkCost + storageCost + gpuCost) * 100
        ) / 100;

      const roundedCost: ResourceCost = {
        cpu: `${currency} ${Math.round(cpuCost * 100) / 100}`,
        memory: `${currency} ${Math.round(memoryCost * 100) / 100}`,
        network: `${currency} ${Math.round(networkCost * 100) / 100}`,
        storage: `${currency} ${Math.round(storageCost * 100) / 100}`,
        gpu: `${currency} ${Math.round(gpuCost * 100) / 100}`,
        total: `${currency} ${Math.round(totalCost * 100) / 100}`,
      };

      setCost(roundedCost);
    }

    setTimeout(() => {
      setLoading(true);
    }, 3000);

    getCost();

    setTimeout(() => {
      setLoading(true);
    }, 3000);

    getCost();
  }, [props.url, props.maxAge]);

  const data = [cost];
  console.log(data);

  const options = {
    filter: false,
    checkbox: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: null,
    responsive: "vertical",
    selectableRows: false,
    customFooter: () => {
      return null;
    },
  };

  if (!loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{errorMsg}</p>;
  }

  return <MUIDataTable options={options} columns={columns} data={data} />;
}

interface CostProps {
  maxAge: string;
  url: string;
}

export interface ResourceCost {
  cpu: string;
  memory: string;
  network: string;
  storage: string;
  gpu: string;
  total: string;
}

export interface Date {
  value: string;
}
