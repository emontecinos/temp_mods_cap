import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserForm from './userForm';

const Register = (props) => {
  const { newUser, setNewUser, handleFetch } = props;

  // When the button is push and send the post
  const handleSubmit = (e) => {
    e.preventDefault();

    // If It's something Incomplete
    if (Object.values(newUser).some((x) => x === '')) {
      setNewUser({
        ...newUser,
        error: { ...newUser.error, allReadyExist: null },
        incompleteForm: true,
      });
    } else if (Object.values(newUser.error).some((x) => x)) {
      // If you have an error
      setNewUser({
        ...newUser,
        error: { ...newUser.error, allReadyExist: null },
        incompleteForm: null,
      });
    } else {
      // if all is complete and no errors
      setNewUser({
        ...newUser,
        error: {
          ...newUser.error,
          incompleteForm: null,
          allReadyExist: null,
        },
      });
      // We send the request
      handleFetch(e);
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
      <Grid item xs={12}>
        <UserForm
          user={newUser}
          setUser={setNewUser}
          handleSubmit={handleSubmit}
          type="register"
        />
      </Grid>
    </Grid>
  );
};

export default Register;
