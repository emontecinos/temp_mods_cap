import React from 'react';
import { useSelector } from 'react-redux';

import RentConfirmationBox from './rentConfirmationBox';

const RentConfirmation = (props) => {
  const { rent, setCurrentState, isLoading } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const bodyConfirmation = (target) => {
    const body = {};
    switch (target) {
      case 'payment':
        body.state = 'first_pay_confirmed';
        body.has_problem = false;
        return body;
      case 'in_progress':
        body.state = 'in_progress';
        body.is_paid = true;
        body.has_problem = false;
        return body;
      case 'done':
        body.state = 'done';
        body.has_problem = false;
        return body;
      case 'paid':
        body.state = 'paid';
        body.has_problem = false;
        return body;
      default:
        body.has_problem = true;
        return body;
    }
  };

  const handleConfirmation = (target) => {
    let body = bodyConfirmation(target);
    setCurrentState(body.state);

    body = JSON.stringify(body);

    fetch(`${process.env.REACT_APP_API_URL}/api/v1/admins/orders/${rent.id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body,
    });
  };

  return (
    <RentConfirmationBox
      rent={rent}
      handleConfirmation={handleConfirmation}
      isLoading={isLoading}
    />
  );
};

export default RentConfirmation;
