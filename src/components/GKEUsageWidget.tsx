import { Entity } from '@backstage/catalog-model';
// import { Card, CardContent, CardHeader, Typography, CardActions, Button } from '@material-ui/core';
import { useGkeUsageMeteringAppData } from './useGkeUsageMeteringAppData';
// import { AggregatedCost } from './aggregatedCostModel';
// import React from 'react';

export const GkEEffSpeedo = ({ entity }: { entity: Entity }) => {
  const { dataset } = useGkeUsageMeteringAppData({ entity });
  // const { deployment } = useKubecostAppData({ entity });

  // const url =
  //   host +
  //   '/model/aggregatedCostModel?window=7d&aggregation=deployment&labels=app%3D' +
  //   deployment;
  // return (
  //   <Card>
  //     <CardHeader
  //       title={<Typography variant="h5">Kubecost Deployment</Typography>}
  //     />

  //     <CardContent>
  //       <AggregatedCost url={url} speedo="true" />
  //     </CardContent>

  //     <CardActions>
  //       <Button size="small" color="primary" href={host + '/request-sizing.html'}>
  //         Learn More
  //       </Button>
  //     </CardActions>
  //   </Card>
  // );

  console.log('Needs to be written' + dataset);
};
