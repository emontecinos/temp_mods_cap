import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DisplayMachines from './displayMachines';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const ListMachines = (props) => {
  const { rent, handleSelect } = props;

  const [machines, setMachines] = useState([]);
  const currentUser = useSelector((state) => state.userInformation);
  const [subOptimal, setSubOptimal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAllMachines = () => {
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
  };

  const handleResponse = (data) => {
    const candidates = data.candidates.filter((machine) => machine.available);
    if (candidates.length > 0) {
      setMachines(data.candidates);
      setIsLoading(false);
    } else {
      setSubOptimal(true);
      const suboptimal = data.suboptimalCandidates.filter((m) => m.available);
      if (suboptimal.length > 0) {
        setMachines(suboptimal);
      } else {
        handleAllMachines();
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (rent.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/machine-candidates/${rent.id}`,
        'GET',
        handleResponse,
        currentUser.token,
        signal,
        null,
        null,
      );
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [rent.id, currentUser.token]);

  return (
    <DisplayMachines
      machines={machines}
      handleSelect={handleSelect}
      subOptimal={subOptimal}
      isLoading={isLoading}
    />
  );
};

export default ListMachines;
