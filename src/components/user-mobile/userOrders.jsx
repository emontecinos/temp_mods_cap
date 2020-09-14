import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import effectAsyncHandler from '../../assets/async/asyncFunction';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  avatar: {
    backgroundColor: theme.palette.text.secondary,
  },
  cardFullHeight: {
    height: '100%',
  },
}));

const ListOrders = (props) => {
  const { user } = props;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (user.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/group/user/${user.id}`,
        'GET',
        (data) => setOrders(data.groupOrders),
        currentUser.token,
        signal,
        null,
        null,
      );
      setIsLoading(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [user.id, currentUser.token]);

  const handleLink = (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Pedidos del usuario" />
      <CardContent>
        <List className={classes.root}>
          {isLoading ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          ) : (
            <>
              {orders.length > 0 ? (
                orders.map((ordergroup) => (
                  <Grid key={`grid-${ordergroup.group_id}`}>
                    <ListItem
                      button
                      onClick={() => handleLink(ordergroup.group_id)}
                    >
                      <ListItemText
                        primary={`Pedido #${ordergroup.group_id} `}
                        secondary={`${Moment.utc(ordergroup.start_date).format(
                          'DD MMM YYYY',
                        )} - ${Moment.utc(ordergroup.end_date).format(
                          'DD MMM YYYY',
                        )}`}
                      />
                    </ListItem>
                    <Divider />
                  </Grid>
                ))
              ) : (
                <Grid>
                  <ListItem>
                    <ListItemText secondary="El usuario no tiene pedidos" />
                  </ListItem>
                </Grid>
              )}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ListOrders;
