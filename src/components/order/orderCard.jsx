import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import OrderDetails from './orderDetails';
import OrderUser from './orderUser';
import DisplayTable from './rentsTable';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '25 25 25 25',
    backgroundColor: theme.palette.common.grey,
    width: '100%',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const OrderCard = (props) => {
  const { order, rents, handleClick, isLoading } = props;
  const classes = useStyles();

  return (
    <Grid item container p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h4">Pedido {order.group_id} </Typography>}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12} md={6}>
              <OrderDetails order={order} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <OrderUser order={order} />
            </Grid>
            <Grid item xs={12}>
              {isLoading || !order.user_id ? (
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <CircularProgress className={classes.spinner} />
                  </Grid>
                </Grid>
              ) : (
                <DisplayTable
                  data={rents}
                  type="orders"
                  handleClick={handleClick}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderCard;
