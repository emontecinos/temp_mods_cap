import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ServiceProviderForm from './newServiceProviderForm';
import effectAsyncHandler from '../../assets/async/asyncFunction';

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

const EditServiceProvider = (props) => {
  const [serviceProvider, setServiceProvider] = useState(initialState);
  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();
  const { match } = props;
  const { id } = match.params;

  const handleGetServiceProvider = (data) => {
    const serviceProviderData = data.serviceProvider;
    setServiceProvider({
      ...serviceProvider,
      ...serviceProviderData,
      serviceType: serviceProviderData.service_type,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/serviceProviders/${id}`,
      'GET',
      handleGetServiceProvider,
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token, id]);

  const handleResponse = (response) => {
    if (response.status === 200) {
      history.push('/serviceProviders');
    } else if (response.status === 400) {
      setServiceProvider({
        ...serviceProvider,
        error: { ...serviceProvider.error, allReadyExist: true },
      });
    } else {
      setServiceProvider({
        ...serviceProvider,
        error: { ...serviceProvider.error, alreadyExist: null },
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/serviceProviders/${id}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: serviceProvider.name,
        email: serviceProvider.email,
        address: serviceProvider.address,
        phone: serviceProvider.phone,
        serviceType: serviceProvider.serviceType,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(serviceProvider).some((x) => x === '')) {
      setServiceProvider({
        ...serviceProvider,
        incompleteForm: true,
      });
    } else if (Object.values(serviceProvider.error).some((x) => x)) {
      // If you have an error
      setServiceProvider({
        ...serviceProvider,
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setServiceProvider({
        ...serviceProvider,
        error: {
          ...serviceProvider.error,
          incompleteForm: null,
        },
      });
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
          type="edit"
          serviceProvider={serviceProvider}
          setServiceProvider={setServiceProvider}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default EditServiceProvider;
