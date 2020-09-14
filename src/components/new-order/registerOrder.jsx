import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import RegisterOrderCard from './registerOrderCard';

const Register = () => {
  const [newOrder, setNewOrder] = useState({
    id: '',
    orders: [],
    incompleteForm: null,
    invalidPeriod: null,
    machineCreated: null,
    error: null,
    missingMachines: null,
  });
  const [users, setUsers] = useState([]);
  const [newMachine, setNewMachine] = useState({
    id_subtype: '',
    id_type: '',
    start_date: '',
    end_date: '',
  });
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins-users`,
      'GET',
      (data) => setUsers(data.users),
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

  // Function to redirect with the button
  const redirectMenu = (event, index) => {
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('/orders');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  const handleResponse = (response, e) => {
    if (response.status === 400) {
      setNewOrder({
        ...newOrder,
        error: response.status,
      });
    } else if (response.status === 201 || response.status === 200) {
      redirectMenu(e, 2);
    } else {
      setNewOrder({
        ...newOrder,
        error: response.status,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request', response.status);
    }
  };

  const handleFetch = (event) => {
    event.preventDefault();
    const machineList = newOrder.orders.map((order) => {
      const object = {};
      object.subtype_id = order.id_subtype;
      object.start_date = order.start_date;
      object.end_date = order.end_date;
      return object;
    });
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/orders`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        user_id: newOrder.id,
        orders: machineList,
      }),
      event,
    );
  };

  return (
    <RegisterOrderCard
      newOrder={newOrder}
      setNewOrder={setNewOrder}
      handleFetch={handleFetch}
      users={users}
      newMachine={newMachine}
      setNewMachine={setNewMachine}
    />
  );
};

export default Register;
