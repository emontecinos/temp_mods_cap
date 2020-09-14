import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import CarrierForm from './newCarrierForm';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  carries: '',
  error: {
    emailError: null,
    alreadyExists: null,
  },
  incompleteForm: null,
  messageError: null,
};

const RegisterCarrier = () => {
  const [newCarrier, setNewCarrier] = useState(initialState);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleResponse = (response) => {
    if (response.status === 400) {
      setNewCarrier({
        ...newCarrier,
        error: { ...newCarrier.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setNewCarrier({
        ...newCarrier,
        error: { ...newCarrier.error, alreadyExists: null },
        messageError: null,
      });
      history.push('/carriers');
    } else {
      setNewCarrier({
        ...newCarrier,
        error: { ...newCarrier.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: newCarrier.name,
        email: newCarrier.email,
        phone: newCarrier.phone,
        address: newCarrier.address,
        carries: newCarrier.carries,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(newCarrier).some((x) => x === '')) {
      setNewCarrier({
        ...newCarrier,
        error: { ...newCarrier.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(newCarrier.error).some((x) => x)) {
      // If you have an error
      setNewCarrier({
        ...newCarrier,
        error: { ...newCarrier.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setNewCarrier({
        ...newCarrier,
        error: {
          ...newCarrier.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      // We send the request
      fetchData(e);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      bgcolor="common.grey"
      style={{ minHeight: '90vh' }}
    >
      <Grid item xs={6}>
        <CarrierForm
          carrier={newCarrier}
          setCarrier={setNewCarrier}
          handleSubmit={handleSubmit}
          type="register"
        />
      </Grid>
    </Grid>
  );
};

export default RegisterCarrier;
