import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import ListCarriers from './listCarriers';
import FormCarrier from './formCarrier';

const AddCarrier = (props) => {
  const { rent, setAddCarrier, setCurrentState, target, titulo } = props;
  const [selection, setSelection] = useState('');
  const currentUser = useSelector((state) => state.userInformation);

  const handleSelect = (e, carrier) => {
    e.preventDefault();
    setSelection(carrier);
  };

  const handleDeleteCarrier = (e) => {
    e.preventDefault();
    setSelection('');
  };

  const handleResponse = () => {
    // We refresh the view with the new machine
    if (target === 'carrier2_id' && rent.carrier_id) {
      setCurrentState('carriers_confirmed');
    } else if (target === 'carrier_id' && rent.carrier2_id) {
      setCurrentState('carriers_confirmed');
    } else {
      setAddCarrier(true);
    }
    setAddCarrier(true);
    setSelection('');
  };

  const handleAddCarrier = () => {
    if (selection.id > 0) {
      const body = {
        [target]: selection.id,
        has_problem: false,
        is_paid: false,
      };

      if (target === 'carrier2_id' && rent.carrier_id) {
        body.state = 'carriers_confirmed';
      } else if (target === 'carrier_id' && rent.carrier2_id) {
        body.state = 'carriers_confirmed';
      }

      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/${rent.id}`,
        'PATCH',
        () => handleResponse(target),
        currentUser.token,
        null,
        JSON.stringify(body),
        null,
      );
    }
  };

  return (
    <>
      <Grid item xs={12} md={7}>
        <ListCarriers handleSelect={handleSelect} titulo={titulo} />
      </Grid>
      <Grid item xs={12} md={5}>
        <FormCarrier
          carrier={selection}
          titulo={titulo}
          handleDeleteCarrier={handleDeleteCarrier}
          handleAddCarrier={handleAddCarrier}
        />
      </Grid>
    </>
  );
};

export default AddCarrier;
