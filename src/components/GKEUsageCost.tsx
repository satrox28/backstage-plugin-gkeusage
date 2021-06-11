import React from "react";
import DataTable from "react-data-table-component";
import getSymbolFromCurrency from "currency-symbol-map";
import { columns } from "./data";

class GKECost extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      memoryCost: 0,
      cpuCost: 0,
      networkCost: 0,
      storageCost: 0,
      gpuCost: 0,
      totalCost: 0,
      currency: "",
      maxAge: "",
      isLoaded: false,
      error: false,
      errorMsg: "",
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `${this.props.url}&maxAge=${this.props.maxAge}`
    ).then((res) => res.json());

    if (response.hasOwnProperty("error")) {
      this.setState({
        error: true,
        errorMsg: response.error.message,
        isLoaded: true,
      });
    }

    const currency: any = getSymbolFromCurrency(response[0].currency);

    let memoryCost = 0;
    let cpuCost = 0;
    let networkCost = 0;
    let storageCost = 0;
    let gpuCost = 0;

    response.forEach(function roundNumbers(value: any) {
      switch (value.resource_name) {
        case "cpu":
          cpuCost += value.cost;
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

    const totalCost =
      Math.round(
        (memoryCost + cpuCost + networkCost + storageCost + gpuCost) * 100
      ) / 100;

    const maxAge = this.props.maxAge;

    this.setState({
      memoryCost,
      cpuCost,
      networkCost,
      storageCost,
      gpuCost,
      totalCost,
      currency,
      maxAge,
      isLoaded: true,
    });
  }

  async componentDidUpdate(prevState: { maxAge: string }) {
    if (prevState.maxAge !== this.props.maxAge) {
      /* eslint-disable */
      this.setState({
        isLoaded: false,
      });
      /* eslint-enable */

      const response = await fetch(
        `${this.props.url}&maxAge=${this.props.maxAge}`
      ).then((res) => res.json());
      const currency: any = getSymbolFromCurrency(response[0].currency);

      let memoryCost = 0;
      let cpuCost = 0;
      let networkCost = 0;
      let storageCost = 0;
      let gpuCost = 0;
      let totalCost = 0;

      response.forEach(function roundNumbers(value: any) {
        switch (value.resource_name) {
          case "cpu":
            cpuCost += value.cost;
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

      totalCost = memoryCost + cpuCost + networkCost + storageCost + gpuCost;

      const maxAge = this.props.maxAge;
      /* eslint-disable */
      this.setState({
        memoryCost,
        cpuCost,
        networkCost,
        storageCost,
        gpuCost,
        totalCost,
        currency,
        maxAge,
        isLoaded: true,
      });
      /* eslint-enable  */
    }
  }

  render() {
    const {
      cpuCost,
      memoryCost,
      networkCost,
      storageCost,
      gpuCost,
      totalCost,
      currency,
      isLoaded,
      error,
      errorMsg,
    } = this.state;

    const data = [
      {
        cpu: currency + Math.round(cpuCost * 100) / 100,
        memory: currency + Math.round(memoryCost * 100) / 100,
        network: currency + Math.round(networkCost * 100) / 100,
        storage: currency + Math.round(storageCost * 100) / 100,
        gpu: currency + Math.round(gpuCost * 100) / 100,
        total: currency + Math.round(totalCost * 100) / 100,
      },
    ];

    if (!isLoaded) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{errorMsg}</p>;
    }
    return (
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}

export { GKECost };
