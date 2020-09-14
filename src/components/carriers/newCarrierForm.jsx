import React from 'react';
import CarrierSetting from './carrierSetting';

const CarrierForm = (props) => {
  const {
    type, // Register or Edit
    carrier, // carrier information
    setCarrier, // to change the information
    handleSubmit, // Manage the button
  } = props;

  // Manage type and name
  const handleChange = (e, target) => {
    e.preventDefault();
    setCarrier({
      ...carrier,
      [target]: e.target.value,
    });
  };

  // check email format
  const handleEmail = (e) => {
    e.preventDefault();
    if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setCarrier({
        ...carrier,
        error: { ...carrier.error, emailError: true, alreadyExist: null },
        email: e.target.value,
      });
    } else {
      setCarrier({
        ...carrier,
        error: { ...carrier.error, emailError: false, alreadyExist: null },
        email: e.target.value,
      });
    }
  };

  return (
    <CarrierSetting
      type={type}
      carrier={carrier}
      handleChange={handleChange}
      handleEmail={handleEmail}
      handleSubmit={handleSubmit}
    />
  );
};

export default CarrierForm;
