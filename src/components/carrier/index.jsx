import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import ButtonGroup from './buttonGroup';
import CarrierCard from './carrierCard';

const Carrier = (props) => {
  const [carrier, setCarrier] = useState('');
  const currentUser = useSelector((state) => state.userInformation);
  const [isLoading, setIsLoading] = useState(true);

  const { match } = props;
  const idCarrier = match.params.id;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers/${idCarrier}`,
      'GET',
      (data) => setCarrier(data.carrier),
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
  }, [idCarrier, currentUser.token]);

  return (
    <>
      <ButtonGroup carrier={carrier} idCarrier={idCarrier} />
      <CarrierCard carrier={carrier} isLoading={isLoading} />
    </>
  );
};

export default Carrier;
