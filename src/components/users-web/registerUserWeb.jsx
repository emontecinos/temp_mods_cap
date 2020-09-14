import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import RegisterUserCard from './registerUserCard';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmation: '',
  type: '',
  showPassword: false,
  error: {
    emailError: null,
    passwordError: null,
    allReadyExist: null,
  },
  incompleteForm: null,
};

const Register = () => {
  const [newUser, setNewUser] = useState(initialState);
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  // Function to redirect with the button
  const redirectMenu = (event, index) => {
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('/users-web');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  const handleResponse = (response, e) => {
    if (response.status === 400) {
      setNewUser({
        ...newUser,
        error: { ...newUser.error, allReadyExist: true },
      });
    } else if (response.status === 201) {
      setNewUser({
        ...newUser,
        error: { ...newUser.error, allReadyExist: null },
      });
      redirectMenu(e, 2);
    } else {
      setNewUser({
        ...newUser,
        error: { ...newUser.error, allReadyExist: null },
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const handleFetch = (event) => {
    event.preventDefault();
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/signup`,
      'POST',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        username: newUser.name,
        email: newUser.email,
        password: newUser.password,
        type: newUser.type,
      }),
      event,
    );
  };

  return (
    <RegisterUserCard
      newUser={newUser}
      setNewUser={setNewUser}
      handleFetch={handleFetch}
    />
  );
};

export default Register;
