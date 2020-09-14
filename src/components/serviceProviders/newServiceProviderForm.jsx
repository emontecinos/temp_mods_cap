import React from 'react';
import ServiceProviderSetting from './serviceProviderSetting';

const ServiceProviderForm = (props) => {
  const {
    type, // Register or Edit
    serviceProvider, // serviceProvider information
    setServiceProvider, // to change the information
    handleSubmit, // Manage the button
  } = props;

  // Manage type and name
  const handleChange = (e, target) => {
    e.preventDefault();
    setServiceProvider({
      ...serviceProvider,
      [target]: e.target.value,
    });
  };

  // check email format
  const handleEmail = (e) => {
    e.preventDefault();
    if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setServiceProvider({
        ...serviceProvider,
        error: {
          ...serviceProvider.error,
          emailError: true,
          alreadyExist: null,
        },
        email: e.target.value,
      });
    } else {
      setServiceProvider({
        ...serviceProvider,
        error: {
          ...serviceProvider.error,
          emailError: false,
          alreadyExist: null,
        },
        email: e.target.value,
      });
    }
  };

  return (
    <ServiceProviderSetting
      type={type}
      serviceProvider={serviceProvider}
      handleChange={handleChange}
      handleEmail={handleEmail}
      handleSubmit={handleSubmit}
    />
  );
};

export default ServiceProviderForm;
