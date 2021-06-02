import { Grid } from '@material-ui/core';
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

class GKEConsumption extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  state = {
    cpuUsage: 0,
    memoryUsage: 0,
    storageUsage: 0,
    networkUsage: 0,
    gpuUsage: 0,
  };

  async componentDidMount() {
    const response = await fetch(this.props.url).then(res => res.json());

    let cpuUsage = 0;
    let memoryUsage = 0;
    let storageUsage = 0;
    let networkUsage = 0;
    let gpuUsage = 0;


    response.forEach(function (value: any) {
      switch (value.resource_name) {
        case 'cpu':
          cpuUsage = value.consumption_percentage;
          break;
        case 'memory':
          memoryUsage = value.consumption_percentage;
          break;
        case 'storage':
          storageUsage = value.consumption_percentage;
          break;
        case 'networkEgress':
          networkUsage = value.consumption_percentage;
          break;
        case 'gpu':
            gpuUsage = value.consumption_percentage;
            break;
      }
    });

    this.setState({
      cpuUsage,
      memoryUsage,
      storageUsage,
      networkUsage,
      gpuUsage,
    });
  }

  render() {
    const { cpuUsage, memoryUsage, storageUsage, networkUsage, gpuUsage } = this.state;
    return (
      <div>
        
        <Grid container spacing={5}>
          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={cpuUsage}
              maxValue={100}
              currentValueText={'cpu usage %'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={memoryUsage}
              maxValue={100}
              currentValueText={'memory usage %'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={networkUsage}
              maxValue={100}
              currentValueText={'network usage %'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={storageUsage}
              maxValue={100}
              currentValueText={'storage usage %'}
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={gpuUsage}
              maxValue={100}
              currentValueText={'gpu usage %'}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { GKEConsumption };
