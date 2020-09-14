import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import OrderCard from './orderCard';

const Order = (props) => {
  const [order, setOrder] = useState('');
  const [rents, setRents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const { match } = props;
  const idOrder = match.params.id;

  const defaultCost = (old, currentRent) => {
    return currentRent.total_cost ? old + currentRent.total_cost : old;
  };

  const defaultDateInit = (old, currentRent, type) => {
    switch (type) {
      case 'init': {
        return old.start_date < currentRent.start_date
          ? old.start_date
          : currentRent.start_date;
      }
      default: {
        return old.end_date > currentRent.end_date
          ? old.end_date
          : currentRent.end_date;
      }
    }
  };

  const handleResponse = (data) => {
    setRents(data.orders);
    setOrder({
      ...data.summary,
      cost: data.orders.reduce((a, b) => defaultCost(a, b), 0),
      dateInit: data.orders.reduce((a, b) => defaultDateInit(a, b, 'init'), {
        start_date: 0,
      }),
      dateEnd: data.orders.reduce((a, b) => defaultDateInit(a, b, 'end'), {
        start_date: 0,
      }),
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/group/${idOrder}`,
      'GET',
      handleResponse,
      currentUser.token,
      signal,
      null,
      null,
    );

    setIsLoading(false);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [idOrder, currentUser.token]);

  const handleClick = (e, rentId) => {
    e.preventDefault();
    history.push(`/rent/${rentId}`);
  };

  const handleReturn = (e) => {
    e.preventDefault();
    history.push(`/orders/`);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <OrderCard
        order={order}
        rents={rents}
        handleClick={handleClick}
        handleReturn={handleReturn}
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default Order;
