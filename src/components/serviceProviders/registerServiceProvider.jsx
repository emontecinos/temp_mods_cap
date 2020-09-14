import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import ServiceProviderForm from './newServiceProviderForm';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  serviceType: '',
  error: {
    emailError: null,
    alreadyExists: null,
  },
  incompleteForm: null,
  messageError: null,
};

const RegisterServiceProvider = () => {
  const [newServiceProvider, setNewServiceProvider] = useState(initialState);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleMessage = (message) => {
    switch (message) {
      case 'email already in use':
        return 'Email ya ha sido registrado';
      default:
        return 'Error del sistema';
    }
  };

  const handleResponse = (response) => {
    if (response.status === 400) {
      setNewServiceProvider({
        ...newServiceProvider,
        error: { ...newServiceProvider.error, alreadyExists: null },
        messageError: null,
      });
      history.push('/serviceProviders');
    } else if (response.status === 400) {
      setNewServiceProvider({
        ...newServiceProvider,
        error: { ...newServiceProvider.error, alreadyExists: true },
        messageError: handleMessage(response.message),
      });
    } else {
      setNewServiceProvider({
        ...newServiceProvider,
        error: { ...newServiceProvider.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/serviceProviders`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: newServiceProvider.name,
        email: newServiceProvider.email,
        phone: newServiceProvider.phone,
        address: newServiceProvider.address,
        serviceType: newServiceProvider.serviceType,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(newServiceProvider).some((x) => x === '')) {
      setNewServiceProvider({
        ...newServiceProvider,
        error: { ...newServiceProvider.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(newServiceProvider.error).some((x) => x)) {
      // If you have an error
      setNewServiceProvider({
        ...newServiceProvider,
        error: { ...newServiceProvider.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setNewServiceProvider({
        ...newServiceProvider,
        error: {
          ...newServiceProvider.error,
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
        <ServiceProviderForm
          serviceProvider={newServiceProvider}
          setServiceProvider={setNewServiceProvider}
          handleSubmit={handleSubmit}
          type="register"
        />
      </Grid>
    </Grid>
  );
};

export default RegisterServiceProvider;
