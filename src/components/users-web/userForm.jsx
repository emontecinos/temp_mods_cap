import React from 'react';
import SettingUser from './settingUser';

const UserForm = (props) => {
  // To manage the set of the values in login/index
  const {
    type, // Register or Edit
    user, // user information
    setUser, // to change the information
    handleSubmit, // Manage the button
  } = props;

  // Manage type and name
  const handleChange = (e, target) => {
    e.preventDefault();
    setUser({
      ...user,
      [target]: e.target.value,
    });
  };

  // check email format
  const handleEmail = (e) => {
    e.preventDefault();
    if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setUser({
        ...user,
        error: { ...user.error, emailError: true, allReadyExist: null },
        email: e.target.value,
      });
    } else {
      setUser({
        ...user,
        error: { ...user.error, emailError: false, allReadyExist: null },
        email: e.target.value,
      });
    }
  };

  // To check if confirmation is the same as password
  const handleConfirmation = (e) => {
    e.preventDefault();
    if (e.target.value !== user.password) {
      setUser({
        ...user,
        error: { ...user.error, passwordError: true },
        confirmation: e.target.value,
      });
    } else {
      setUser({
        ...user,
        error: { ...user.error, passwordError: false },
        confirmation: e.target.value,
      });
    }
  };

  // Show or hide the password and confirmation
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  // Two functions to know if password and confirmation are the same
  const handlePassword = (e) => {
    e.preventDefault();
    if (e.target.value !== user.confirmation) {
      setUser({
        ...user,
        error: { ...user.error, passwordError: true },
        password: e.target.value,
      });
    } else {
      setUser({
        ...user,
        error: { ...user.error, passwordError: false },
        password: e.target.value,
      });
    }
  };

  return (
    <SettingUser
      type={type}
      user={user}
      handleChange={handleChange}
      handleEmail={handleEmail}
      handleClickShowPassword={handleClickShowPassword}
      handlePassword={handlePassword}
      handleConfirmation={handleConfirmation}
      handleSubmit={handleSubmit}
    />
  );
};

export default UserForm;
