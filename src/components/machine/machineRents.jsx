import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import MachineRentsBox from './machineRentsBox';

const ListOrders = (props) => {
  const { machine } = props;
  const [rents, setRents] = useState(' ');
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);
  const [isLoadingRents, setIsLoadingRents] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (machine.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admin-machines/orders/${machine.id}`,
        'GET',
        setRents,
        currentUser.token,
        signal,
        null,
        null,
      );
      setIsLoadingRents(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [machine.id]);

  const handleRent = (e, orderId) => {
    e.preventDefault();
    history.push(`/rent/${orderId}`);
  };

  return (
    <MachineRentsBox
      rents={rents}
      isLoadingRents={isLoadingRents}
      handleRent={handleRent}
    />
  );
};

export default ListOrders;
