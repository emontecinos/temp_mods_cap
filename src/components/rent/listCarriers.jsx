import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DisplayCarriers from './displayCarriers';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const ListCarriers = (props) => {
  const { handleSelect, titulo } = props;
  const [carriers, setCarriers] = useState([]);
  const currentUser = useSelector((state) => state.userInformation);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers`,
      'GET',
      (data) => setCarriers(data.carriers),
      currentUser.token,
      signal,
      null,
      null,
    );
    setIsLoading(false);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  return (
    <DisplayCarriers
      carriers={carriers.filter((carrier) => carrier.active)}
      titulo={titulo}
      handleSelect={handleSelect}
      isLoading={isLoading}
    />
  );
};

export default ListCarriers;
