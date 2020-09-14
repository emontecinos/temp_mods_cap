import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from './machinesTable';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const Machines = () => {
  const currentUser = useSelector((state) => state.userInformation);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/machines`,
      'GET',
      (data) => setMachines(data.machines),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  return <Table data={machines} />;
};

export default Machines;
