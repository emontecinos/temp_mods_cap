import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import UserForm from './userForm';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmation: '',
  type: '',
  showPassword: false,
  send: false,
  error: {
    emailError: null,
    passwordError: null,
    allReadyExist: null,
  },
  incompleteForm: null,
};

const EditUser = (props) => {
  const [user, setUser] = useState(initialState);
  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();
  const { match } = props;
  const userId = match.params.id;

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

  const handleGetUser = (data) => {
    const { name, email, role } = data.admin;
    setUser({
      ...user,
      email,
      name,
      type: role,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    // GET user information
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/${userId}`,
      'GET',
      handleGetUser,
      currentUser.token,
      signal,
      JSON.stringify({}),
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [userId, currentUser.token]);

  const handleResponse = (response, e) => {
    if (response.status === 'fail') {
      setUser({
        ...user,
        error: { ...user.error, allReadyExist: true },
      });
    } else if (response.status === 200) {
      redirectMenu(e, 2);
    } else {
      setUser({
        ...user,
        error: { ...user.error, allReadyExist: null },
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/${userId}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        email: user.email,
        password: user.password,
        type: user.type,
        username: user.name,
      }),
      event,
    );
  };

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(user).some((x) => x === '')) {
      setUser({
        ...user,
        incompleteForm: true,
      });
    } else if (Object.values(user.error).some((x) => x)) {
      // If you have an error
      setUser({
        ...user,
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setUser({
        ...user,
        error: {
          ...user.error,
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
        <UserForm
          type="edit"
          user={user}
          setUser={setUser}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default EditUser;
