import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken, signIn, addEmail, addType } from '../../redux/actions';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import LoginCard from './loginCard';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
    showPassword: false,
    error: {
      emailValidation: null,
      userValidation: null,
      userPassword: null,
    },
  };
  const [user, setUser] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const redirectMenu = (event, index) => {
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('recover-password');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  const handleResponse = (response, e) => {
    if ('token' in response) {
      redirectMenu(e, 1);
      dispatch(addToken(response.token));
      dispatch(signIn());
      dispatch(addEmail(user.email));
      dispatch(addType(response.role));
    } else if (response.status === 'fail') {
      setUser({
        ...user,
        error: { ...user.error, userValidation: true },
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/login`,
      'POST',
      handleResponse,
      null,
      null,
      JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      event,
    );
  };

  return (
    <LoginCard
      user={user}
      setUser={setUser}
      handleSubmit={handleSubmit}
      redirectMenu={redirectMenu}
    />
  );
};

export default Login;
