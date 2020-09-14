import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CarrierForm from './newCarrierForm';
import effectAsyncHandler from '../../assets/async/asyncFunction';

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

const EditCarrier = (props) => {
  const [carrier, setCarrier] = useState(initialState);
  const currentUser = useSelector((state) => state.userInformation);

  const history = useHistory();
  const { match } = props;
  const { id } = match.params;

  const handleGetCarrier = (data) => {
    setCarrier({
      ...carrier,
      ...data.carrier,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers/${id}`,
      'GET',
      handleGetCarrier,
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
    if (response.status === 'fail') {
      setCarrier({
        ...carrier,
        error: { ...carrier.error, allReadyExist: true },
      });
    } else if (response.status === 200) {
      history.push('/carriers');
    } else {
      setCarrier({
        ...carrier,
        error: { ...carrier.error, alreadyExist: null },
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers/${id}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: carrier.name,
        email: carrier.email,
        address: carrier.address,
        phone: carrier.phone,
        carries: carrier.carries,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(carrier).some((x) => x === '')) {
      setCarrier({
        ...carrier,
        incompleteForm: true,
      });
    } else if (Object.values(carrier.error).some((x) => x)) {
      // If you have an error
      setCarrier({
        ...carrier,
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setCarrier({
        ...carrier,
        error: {
          ...carrier.error,
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
        <CarrierForm
          type="edit"
          carrier={carrier}
          setCarrier={setCarrier}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default EditCarrier;
