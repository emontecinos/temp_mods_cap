import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventIcon from '@material-ui/icons/Event';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    height: '100%',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const formatter = new Intl.NumberFormat('es-CL', {
  currency: 'CLP',
  style: 'currency',
});

const RentDetails = (props) => {
  const { order, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Detalles del Pedido
          </Typography>
        }
      />
      <CardContent>
        {isLoading || !order.user_id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid container p={1}>
            <Grid item container alignItems="center" xs={12} p={1}>
              <Grid item>
                <Tooltip title="Costo">
                  <MonetizationOnIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                Costo Total:
                {order.cost
                  ? formatter.format(order.cost)
                  : formatter.format(0)}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Fecha Inicio">
                  <DateRangeIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                {order.start_date
                  ? Moment.utc(order.start_date).format('MMM DD, YYYY')
                  : 'Falta información'}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Fecha Término">
                  <EventIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                {order.end_date
                  ? Moment.utc(order.end_date).format('MMM DD, YYYY')
                  : 'Falta información'}
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default RentDetails;
