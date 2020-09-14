import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import CarrierInfo from './carrierInfo';
import CarrierState from './carrierState';
import CarrierRents from './carrierRents';

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

const CarrierCard = (props) => {
  const { carrier, isLoading } = props;
  const classes = useStyles();

  return (
    <Grid item p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h4">{carrier.name} </Typography>}
          subheader={
            <Typography variant="h6">Transportista {carrier.id}</Typography>
          }
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid item container xs={12} spacing={2} justify="flex-end">
            <Grid item xs={12} md={5}>
              <CarrierState carrier={carrier} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={7}>
              <CarrierInfo carrier={carrier} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={7}>
              <CarrierRents carrier={carrier} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CarrierCard;
