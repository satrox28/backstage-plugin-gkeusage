import { Grid } from "@material-ui/core";
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

class GKEEfficiency extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuEfficiency: 0,
      memoryEfficiency: 0,
      storageEfficiency: 0,
      networkEfficiency: 0,
      gpuEfficiency: 0,
    };
  }

  async componentDidMount() {
    const usage = await fetch(this.props.usageUrl).then((res) => res.json());
    const cost = await fetch(this.props.costUrl).then((res) => res.json());

    let cpuUsage = 0;
    let memoryUsage = 0;
    let storageUsage = 0;
    let networkUsage = 0;
    let gpuUsage = 0;
    let memoryCost = 0;
    let cpuCost = 0;
    let networkCost = 0;
    let storageCost = 0;
    let gpuCost = 0;

    usage.forEach(function setPercentage(value: any) {
      switch (value.resource_name) {
        case "cpu":
          cpuUsage = value.consumption_percentage;
          break;
        case "memory":
          memoryUsage = value.consumption_percentage;
          break;
        case "storage":
          storageUsage = value.consumption_percentage;
          break;
        case "networkEgress":
          networkUsage = value.consumption_percentage;
          break;
        case "gpu":
          gpuUsage = value.consumption_percentage;
          break;
        default:
          break;
      }
    });

    cost.forEach(function roundNumbers(value: any) {
      switch (value.resource_name) {
        case "cpu":
          cpuCost = Math.round(value.cost * 100) / 100;
          break;
        case "memory":
          memoryCost = Math.round(value.cost * 100) / 100;
          break;
        case "storage":
          storageCost = Math.round(value.cost * 100) / 100;
          break;
        case "networkEgress":
          networkCost = Math.round(value.cost * 100) / 100;
          break;
        case "gpu":
          gpuCost = Math.round(value.cost * 100) / 100;
          break;
        default:
          break;
      }
    });

    const cpuEfficiency = cpuCost * cpuUsage;
    const memoryEfficiency = memoryCost * memoryUsage;
    const storageEfficiency = storageCost * storageUsage;
    const networkEfficiency = networkCost * networkUsage;
    const gpuEfficiency = gpuCost * gpuUsage;

    this.setState({
      cpuEfficiency,
      memoryEfficiency,
      storageEfficiency,
      networkEfficiency,
      gpuEfficiency,
    });
  }

  render() {
    const {
      cpuEfficiency,
      memoryEfficiency,
      storageEfficiency,
      networkEfficiency,
      gpuEfficiency,
    } = this.state;
    return (
      <div>
        <Grid container spacing={5}>
          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={cpuEfficiency}
              maxValue={100}
              // currentValueText={'cpu efficiency'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={memoryEfficiency}
              maxValue={100}
              // currentValueText={'memory efficiency'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={networkEfficiency}
              maxValue={100}
              // currentValueText={'network efficiency'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={storageEfficiency}
              maxValue={100}
              // currentValueText={'storage efficiency'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={gpuEfficiency}
              maxValue={100}
              // currentValueText={'gpu efficiency'}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { GKEEfficiency };
