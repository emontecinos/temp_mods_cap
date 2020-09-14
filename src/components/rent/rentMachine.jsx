import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RentMachineBox from './rentMachineBox';
import { changeLastPage } from '../../redux/actions';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const RentMachine = (props) => {
  const { rent } = props;
  const [machine, setMachine] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (rent.machine_id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/machines/${rent.machine_id}`,
        'GET',
        (data) => setMachine(data.machine),
        currentUser.token,
        signal,
        null,
        null,
      );

      setIsLoading(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  const handleMachine = (e, machineId) => {
    e.preventDefault();

    history.push(`/machines/${machineId}`);
    dispatch(changeLastPage(`/rent/${rent.id}`));
  };

  const handleUser = (e, UserId) => {
    e.preventDefault();

    history.push(`/users-mobile/${UserId}`);
    dispatch(changeLastPage(`/rent/${rent.id}`));
  };

  return (
    <RentMachineBox
      machine={machine}
      handleUser={handleUser}
      handleMachine={handleMachine}
      isLoading={isLoading}
    />
  );
};

export default RentMachine;
