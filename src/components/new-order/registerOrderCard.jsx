import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import OrderForm from './orderForm';
import effectAsyncHandler from '../../assets/async/asyncFunction';

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

const Register = (props) => {
  const {
    newOrder,
    setNewOrder,
    handleFetch,
    users,
    newMachine,
    setNewMachine,
  } = props;
  const [machineTypes, setMachineTypes] = useState([]);
  const currentUser = useSelector((state) => state.userInformation);
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types`,
      'GET',
      (data) => setMachineTypes(data.types),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newOrder.orders.length === 0) {
      setNewOrder({
        ...newOrder,
        missingMachines: true,
      });
    } else {
      // if all is complete and no errors
      setNewOrder({
        ...newOrder,
        incompleteForm: null,
        invalidPeriod: null,
        missingMachines: null,
      });
      // We send the request
      handleFetch(e);
    }
  };

  const handleSubmitMachine = (e) => {
    e.preventDefault();

    if (Object.values(newMachine).some((x) => x === '')) {
      setNewOrder({
        ...newOrder,
        incompleteForm: true,
      });
    } else if (
      Date.parse(newMachine.start_date) >= Date.parse(newMachine.end_date) ||
      Date.parse(newMachine.start_date) <
        Date.parse(Moment.utc().format('YYYY-MM-DD'))
    ) {
      // If you have an invalid period
      setNewOrder({
        ...newOrder,
        incompleteForm: null,
        invalidPeriod: true,
      });
    } else {
      // if all is complete and no errors
      const listMachines = newOrder.orders;
      listMachines.push(newMachine);
      setNewOrder({
        ...newOrder,
        orders: listMachines,
        incompleteForm: null,
        invalidPeriod: null,
        missingMachines: null,
      });
      setNewMachine({
        id_subtype: '',
        id_type: '',
        start_date: '',
        end_date: '',
      });
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography variant="h4">Crear Pedido</Typography>}
        className={classes.cardHeader}
      />
      <CardContent>
        <OrderForm
          users={users}
          machineTypes={machineTypes}
          order={newOrder}
          setOrder={setNewOrder}
          handleSubmit={handleSubmit}
          handleSubmitMachine={handleSubmitMachine}
          newMachine={newMachine}
          setNewMachine={setNewMachine}
        />
      </CardContent>
    </Card>
  );
};

export default Register;
