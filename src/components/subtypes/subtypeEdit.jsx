import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import SubtypeForm from './subtypeForm';

const initialState = {
  id: 0,
  type_id: 0,
  name: '',
  price: '',
  weekly_price: '',
  description: '',
  error: {
    alreadyExists: null,
  },
  incompleteForm: null,
};

const RegisterSubtype = (props) => {
  const { idSubtype, setIdSubtype } = props;
  const [subtype, setSubtype] = useState(initialState);
  const currentUser = useSelector((state) => state.userInformation);

  const history = useHistory();

  const handleResponse = (response) => {
    if (response.status === 400) {
      setSubtype({
        ...subtype,
        error: { ...subtype.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setSubtype({
        ...subtype,
        error: { ...subtype.error, alreadyExists: null },
        messageError: null,
      });
      setIdSubtype(0);
      history.push('/types');
      history.push(`/types/${subtype.type_id}`);
    } else {
      setSubtype({
        ...subtype,
        error: { ...subtype.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const handleInfo = (data) => {
    setSubtype({
      ...subtype,
      id: data.id,
      type_id: data.type_id,
      name: data.name,
      price: data.price,
      weekly_price: data.weekly_price ? data.weekly_price : '',
      description: data.description,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/subtypes/${idSubtype}`,
      'GET',
      (data) => handleInfo(data.subType[0]),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [idSubtype, currentUser.token]);

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/subtypes/${subtype.id}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: subtype.name,
        price: subtype.price,
        weekly_price: subtype.weekly_price,
        description: subtype.description,
      }),
      event,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(subtype).some((x) => x === '')) {
      setSubtype({
        ...subtype,
        error: { ...subtype.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(subtype.error).some((x) => x)) {
      setSubtype({
        ...subtype,
        error: { ...subtype.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      setSubtype({
        ...subtype,
        error: {
          ...subtype.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      fetchData(e);
    }
  };

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={8} md={8} p={10}>
        <SubtypeForm
          subtype={subtype}
          setSubtype={setSubtype}
          handleSubmit={handleSubmit}
          state="edit"
        />
      </Grid>
    </Grid>
  );
};

export default RegisterSubtype;
