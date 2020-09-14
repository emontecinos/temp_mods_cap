import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import TypeForm from '../type/typeForm';

const initialState = {
  name: '',
  description: '',
  error: {
    alreadyExists: null,
  },
  incompleteForm: null,
};

const RegisterType = () => {
  const [newType, setNewType] = useState(initialState);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleResponse = (response) => {
    if (response.status === 400) {
      setNewType({
        ...newType,
        error: { ...newType.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setNewType({
        ...newType,
        error: { ...newType.error, alreadyExists: null },
        messageError: null,
      });
      history.push('/');
      history.push('/types');
    } else {
      setNewType({
        ...newType,
        error: { ...newType.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: newType.name,
        description: newType.description,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(newType).some((x) => x === '')) {
      setNewType({
        ...newType,
        error: { ...newType.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(newType.error).some((x) => x)) {
      // If you have an error
      setNewType({
        ...newType,
        error: { ...newType.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setNewType({
        ...newType,
        error: {
          ...newType.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      // We send the request
      fetchData(e);
    }
  };

  return (
    <TypeForm
      data={newType}
      setData={setNewType}
      handleSubmit={handleSubmit}
      state="register"
    />
  );
};

export default RegisterType;
