import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import RecentMovementCard from './recentMovementCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const RecentMovements = (props) => {
  const { orders } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">Últimos movimientos</Typography>
        </CardContent>
      </CardActionArea>
      {orders && (
        <CardActions>
          <Grid item container xs={12} spacing={1}>
            {orders.map((order) => {
              return (
                <Grid item xs={12} sm={4} key={`order-${order.id}`}>
                  <RecentMovementCard
                    order={order}
                    key={`home-movement$ ${order.id}`}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

export default RecentMovements;
