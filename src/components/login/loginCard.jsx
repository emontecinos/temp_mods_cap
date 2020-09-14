import React from 'react';
import Grid from '@material-ui/core/Grid';
import LoginForm from './loginForm';

const LoginCard = (props) => {
  const { user, setUser, handleSubmit, redirectMenu } = props;

  const handleEmail = (e) => {
    e.preventDefault();
    if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setUser({
        ...user,
        error: { emailValidation: true },
        email: e.target.value,
      });
    } else {
      setUser({
        ...user,
        error: { emailValidation: null, userValidation: null },
        email: e.target.value,
      });
    }
  };

  const handleChange = (e, target) => {
    e.preventDefault();
    setUser({
      ...user,
      [target]: e.target.value,
      error: { userValidation: null },
    });
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
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
        <LoginForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleEmail={handleEmail}
          handleClickShowPassword={handleClickShowPassword}
          redirectMenu={redirectMenu}
          user={user}
        />
      </Grid>
    </Grid>
  );
};

export default LoginCard;
