import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import FormMachine from './formMachine';
import ListMachines from './listMachines';

const AddMachine = (props) => {
  const { rent, setCurrentState } = props;
  const [selection, setSelection] = useState('');
  const currentUser = useSelector((state) => state.userInformation);

  const handleSelect = (e, machine) => {
    e.preventDefault();
    setSelection(machine);
  };

  const handleDeleteMachine = (e) => {
    e.preventDefault();
    setSelection('');
  };

  const handleResponse = () => {
    // To refresh the view with the new machine
    setCurrentState('machine_confirmed');
    setSelection('');
  };

  const handleAddMachine = () => {
    if (selection.id > 0) {
      if (rent.self_transport) {
        effectAsyncHandler(
          `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/${rent.id}`,
          'PATCH',
          handleResponse,
          currentUser.token,
          null,
          JSON.stringify({
            machine_id: selection.id,
            state: 'carriers_confirmed',
            has_problem: false,
            is_paid: false,
          }),
          null,
        );
      } else {
        effectAsyncHandler(
          `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/${rent.id}`,
          'PATCH',
          handleResponse,
          currentUser.token,
          null,
          JSON.stringify({
            machine_id: selection.id,
            state: 'machine_confirmed',
            has_problem: false,
            is_paid: false,
          }),
          null,
        );
      }
    }
  };

  return (
    <>
      <Grid item xs={12} md={7}>
        <ListMachines rent={rent} handleSelect={handleSelect} />
      </Grid>
      <Grid item xs={12} md={5}>
        <FormMachine
          machine={selection}
          handleDeleteMachine={handleDeleteMachine}
          handleAddMachine={handleAddMachine}
        />
      </Grid>
    </>
  );
};

export default AddMachine;
