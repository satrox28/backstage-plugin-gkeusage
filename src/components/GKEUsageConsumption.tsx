import { Grid } from '@material-ui/core';
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

class GKEConsumption extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 0,
      networkUsage: 0,
      gpuUsage: 0,
      maxAge: '',
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `${this.props.url}&maxAge=${this.props.maxAge}`,
    ).then(res => res.json());

    let cpuUsage = 0;
    let memoryUsage = 0;
    let storageUsage = 0;
    let networkUsage = 0;
    let gpuUsage = 0;

    response.forEach(function setPercentage(value: any) {
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
        default:
          break;
      }
    });

    const maxAge = this.props.maxAge;

    this.setState({
      cpuUsage,
      memoryUsage,
      storageUsage,
      networkUsage,
      gpuUsage,
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
        `${this.props.url}&maxAge=${this.props.maxAge}`,
      ).then(res => res.json());

      let cpuUsage = 0;
      let memoryUsage = 0;
      let storageUsage = 0;
      let networkUsage = 0;
      let gpuUsage = 0;

      response.forEach(function setPercentage(value: any) {
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
          default:
            break;
        }
      });

      const maxAge = this.props.maxAge;
      /* eslint-disable */
      this.setState({
        cpuUsage,
        memoryUsage,
        storageUsage,
        networkUsage,
        gpuUsage,
        maxAge,
        isLoaded: true,
      });
      /* eslint-enable */
    }
  }

  render() {
    const {
      cpuUsage,
      memoryUsage,
      storageUsage,
      networkUsage,
      gpuUsage,
      isLoaded,
    } = this.state;

    if (!isLoaded) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Grid container spacing={5}>
          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={cpuUsage}
              maxValue={100}
              currentValueText="cpu usage %"
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={memoryUsage}
              maxValue={100}
              currentValueText="memory usage %"
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={networkUsage}
              maxValue={100}
              currentValueText="network usage %"
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={storageUsage}
              maxValue={100}
              currentValueText="storage usage %"
            />
          </Grid>

          <Grid item direction="row" alignItems="center">
            <ReactSpeedometer
              value={gpuUsage}
              maxValue={100}
              currentValueText="gpu usage %"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { GKEConsumption };
