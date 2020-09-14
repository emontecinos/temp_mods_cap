import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import effectAsyncHandler from '../../assets/async/asyncFunction';
import SettingOrder from './settingOrder';
import MachineList from './machineList';

const OrderForm = (props) => {
  // To manage the set of the values in login/index
  const {
    order, // order information
    setOrder, // to change the information
    handleSubmit, // Manage the button
    handleSubmitMachine, // Manage the button for new machine
    users, // existing mobile users
    machineTypes, // existing machine categories for type of machine
    newMachine,
    setNewMachine,
  } = props;

  const [machineSubTypes, setMachineSubTypes] = useState([]);
  const [allSubTypes, setAllSubTypes] = useState([]);
  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    let path;

    if (newMachine.id_type > 0) {
      path = `${process.env.REACT_APP_API_URL}/api/v1/subtypes/type/${newMachine.id_type}`;
    } else {
      path = `${process.env.REACT_APP_API_URL}/api/v1/subtypes`;
    }

    effectAsyncHandler(
      path,
      'GET',
      (data) => setMachineSubTypes(data.subTypes),
      currentUser.token,
      signal,
      null,
      null,
    );

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/subtypes`,
      'GET',
      (data) => setAllSubTypes(data.subTypes),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [newMachine]);

  // Manage type and name
  const handleChange = (e, target) => {
    e.preventDefault();
    if (target === 'id') {
      setOrder({
        ...order,
        [target]: e.target.value,
      });
    } else {
      // const listMachines = order.orders;
      // let lastMachine = order.orders[order.orders.length - 1];
      // lastMachine = { ...lastMachine, [target]: e.target.value };
      // listMachines[order.orders.length - 1] = lastMachine;
      // setOrder({
      //   ...order,
      //   orders: listMachines,
      //   machineCreated: null,
      // });
      setNewMachine({
        ...newMachine,
        [target]: e.target.value,
      });
    }
  };

  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={12} md={6}>
        <SettingOrder
          order={order}
          users={users}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          machineTypes={machineTypes}
          machineSubTypes={machineSubTypes}
          handleSubmitMachine={handleSubmitMachine}
          newMachine={newMachine}
          setNewMachine={setNewMachine}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <MachineList
          order={order}
          setOrder={setOrder}
          machineSubTypes={allSubTypes}
        />
      </Grid>
    </Grid>
  );
};

export default OrderForm;
