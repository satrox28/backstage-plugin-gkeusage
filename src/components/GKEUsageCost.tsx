import React from 'react';
import DataTable from 'react-data-table-component';
import getSymbolFromCurrency from 'currency-symbol-map';
class GKECost extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    memoryCost: 0,
    cpuCost: 0,
    networkCost: 0,
    storageCost: 0,
    gpuCost: 0,
    totalCost: 0,
    currency: '',
  };

  async componentDidMount() {
    const response = await fetch(this.props.url).then(res => res.json());
    const currency: any = getSymbolFromCurrency(response[0].currency);

    let memoryCost = 0;
    let cpuCost = 0;
    let networkCost = 0;
    let storageCost = 0;
    let gpuCost = 0;

    response.forEach(function (value: any) {
      switch (value.resource_name) {
        case 'cpu':
          cpuCost = Math.round(value.cost * 100) / 100;
          break;
        case 'memory':
          memoryCost = Math.round(value.cost * 100) / 100;
          break;
        case 'storage':
          storageCost = Math.round(value.cost * 100) / 100;
          break;
        case 'networkEgress':
          networkCost = Math.round(value.cost * 100) / 100;
          break;
          case 'gpu':
            gpuCost = Math.round(value.cost * 100) / 100;
            break;
      }
    });

    const totalCost =
      memoryCost + cpuCost + networkCost + storageCost + gpuCost;

    this.setState({
      memoryCost,
      cpuCost,
      networkCost,
      storageCost,
      gpuCost,
      totalCost,
      currency,
    });
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
    } = this.state;

    const columns = [
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

    const data = [
      {
        cpu: currency + cpuCost,
        memory: currency + memoryCost,
        network: currency + networkCost,
        storage: currency + storageCost,
        gpu: currency + gpuCost,
        total: currency + totalCost,
      },
    ];
    return (
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}

export { GKECost };
