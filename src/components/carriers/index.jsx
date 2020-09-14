import React from 'react';
import { useHistory } from 'react-router-dom';
import DisplayCarriers from './displayCarriers';
import ButtonGroup from './buttonGroup';

const Carriers = () => {
  const history = useHistory();

  const handleClick = (e, carrierId) => {
    e.preventDefault();
    history.push(`/carriers/${carrierId}`);
  };

  return (
    <>
      <ButtonGroup />
      <DisplayCarriers handleClick={handleClick} />
    </>
  );
};

export default Carriers;
