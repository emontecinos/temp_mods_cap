import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import ServiceProviderInfo from './serviceProviderInfo';
import ServiceProviderState from './serviceProviderState';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '25 25 25 25',
    backgroundColor: theme.palette.common.grey,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
}));

const ServiceProviderCard = (props) => {
  const { serviceProvider, isLoading } = props;
  const classes = useStyles();

  return (
    <Grid item p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h4">{serviceProvider.name} </Typography>}
          subheader={
            <Typography variant="h6">
              Prestador de Servicio {serviceProvider.id}
            </Typography>
          }
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid item container xs={12} spacing={2} justify="flex-end">
            <Grid item xs={12} md={5}>
              <ServiceProviderState
                serviceProvider={serviceProvider}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <ServiceProviderInfo
                serviceProvider={serviceProvider}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ServiceProviderCard;
