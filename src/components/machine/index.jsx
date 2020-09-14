import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MachineCard from './machineCard';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import Switch from './switchMachine';

const Machine = (props) => {
  const [machine, setMachine] = useState('');
  const { match } = props;
  const machineId = match.params.id;
  const currentUser = useSelector((state) => state.userInformation);
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (machineId > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admin-machines/${machineId}`,
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
  }, [editState, machineId, machine.archived]);

  return (
    <div>
      <Switch machine={machine} setMachine={setMachine} />
      <MachineCard
        machine={machine}
        isLoading={isLoading}
        editState={editState}
        setEditState={setEditState}
      />
    </div>
  );
};

export default Machine;
