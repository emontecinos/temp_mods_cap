import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import SubtypeForm from './subtypeForm';

const initialState = {
  name: '',
  description: '',
  error: {
    alreadyExists: null,
  },
  incompleteForm: null,
};

const RegisterSubtype = (props) => {
  const { idType } = props;
  const [newSubtype, setNewSubtype] = useState(initialState);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleResponse = (response) => {
    if (response.status === 400) {
      setNewSubtype({
        ...newSubtype,
        error: { ...newSubtype.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setNewSubtype({
        ...newSubtype,
        error: { ...newSubtype.error, alreadyExists: null },
        messageError: null,
      });
      history.push('/types');
      history.push(`/types/${idType}`);
    } else {
      setNewSubtype({
        ...newSubtype,
        error: { ...newSubtype.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/subtypes`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        type_id: idType,
        name: newSubtype.name,
        price: newSubtype.price,
        weekly_price: newSubtype.weekly_price,
        description: newSubtype.description,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(newSubtype).some((x) => x === '')) {
      setNewSubtype({
        ...newSubtype,
        error: { ...newSubtype.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(newSubtype.error).some((x) => x)) {
      // If you have an error
      setNewSubtype({
        ...newSubtype,
        error: { ...newSubtype.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setNewSubtype({
        ...newSubtype,
        error: {
          ...newSubtype.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      // We send the request
      fetchData(e);
    }
  };

  return (
    <SubtypeForm
      subtype={newSubtype}
      setSubtype={setNewSubtype}
      handleSubmit={handleSubmit}
      state="register"
    />
  );
};

export default RegisterSubtype;
