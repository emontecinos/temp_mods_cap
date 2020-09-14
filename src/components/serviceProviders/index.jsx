import React from 'react';
import { useHistory } from 'react-router-dom';
import DisplayServiceProviders from './displayServiceProviders';
import ButtonGroup from './buttonGroup';

const ServiceProviders = () => {
  const history = useHistory();

  const handleClick = (e, id) => {
    e.preventDefault();
    history.push(`serviceProviders/${id}`);
  };

  return (
    <>
      <ButtonGroup />
      <DisplayServiceProviders handleClick={handleClick} />
    </>
  );
};

export default ServiceProviders;
