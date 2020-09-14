import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';

import ServiceProviderCard from './serviceProviderCard';
import ButtonGroup from './buttonGroup';

const ServiceProvider = (props) => {
  const [serviceProvider, setServiceProvider] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { match } = props;
  const idServiceProvider = match.params.id;

  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/serviceProviders/${idServiceProvider}`,
      'GET',
      (data) => setServiceProvider(data.serviceProvider),
      currentUser.token,
      signal,
      null,
      null,
    );
    setIsLoading(false);

    return () => {
      abortController.abort();
    };
  }, [currentUser.token, idServiceProvider]);

  return (
    <div>
      <ButtonGroup
        serviceProvider={serviceProvider}
        idServiceProvider={idServiceProvider}
      />
      <ServiceProviderCard
        serviceProvider={serviceProvider}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ServiceProvider;
