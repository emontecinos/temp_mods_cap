import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import OrdersTable from './ordersTable';
import ButtonGroup from '../new-order/buttonGroup';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/group`,
      'GET',
      (data) => setOrders(data.groupOrders),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  const handleOrder = (e, orderId) => {
    e.preventDefault();
    history.push(`/orders/${orderId}`);
  };

  return (
    <div>
      <ButtonGroup />
      <Grid
        item
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
      >
        <OrdersTable orders={orders} handleOrder={handleOrder} />
      </Grid>
    </div>
  );
};

export default Orders;
