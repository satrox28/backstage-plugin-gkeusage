import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import ReactSpeedometer from 'react-d3-speedometer';

export function GKEConsumption(props: ConsumptionProps) {
  const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState('')
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    setLoading(false)
    async function getUsage() {
      const response = await fetch(
        `${props.url}&maxAge=${props.maxAge}`,
      );
      const json = await response.json();
      
      if (json.hasOwnProperty('error')) {
        setError(true)
        setErrorMsg(json.error.message)
      }

      setUsage(json);
    }
    getUsage();

    setTimeout(() => {
      setLoading(true)
   }, 3000)


  }, [props.maxAge]);

  if(!loading){
    return <div>Loading...</div> 
 }
 if (error) {
  return <p>{errorMsg}</p>;
}

  return (
    <div>
      <Grid container spacing={5}>
        {usage.map((item: Consumption) =>
          item.consumption_percentage > 0 ? (
            <Grid key={item.resource_name} item sm={4}>
              <ReactSpeedometer
                value={item.consumption_percentage}
                maxValue={100}
                currentValueText={`${item.resource_name} usage %`}
              />
            </Grid>
          ) : null,
        )}
      </Grid>
    </div>
  );
}

interface Consumption {
  key: string;
  value: string;
  namespace: string;
  resource_name: string;
  requested_amount: number;
  consumed_amount?: number;
  unit: string;
  consumption_percentage: number;
}

interface ConsumptionProps {
  maxAge: string;
  url: string
}
