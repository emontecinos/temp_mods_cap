import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RentCarriersBox from './rentCarriersBox';
import { changeLastPage } from '../../redux/actions';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const initialState = {
  name: '',
  phone: '',
};

const RentCarriers = (props) => {
  const { rent } = props;
  const [carrier1, setCarrier1] = useState(initialState);
  const [carrier2, setCarrier2] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!rent.self_transport) {
      if (rent.carrier_id) {
        effectAsyncHandler(
          `${process.env.REACT_APP_API_URL}/api/v1/carriers/${rent.carrier_id}`,
          'GET',
          (data) => setCarrier1(data.carrier),
          currentUser.token,
          signal,
          null,
          null,
        );
      }

      if (rent.carrier2_id > 0) {
        effectAsyncHandler(
          `${process.env.REACT_APP_API_URL}/api/v1/carriers/${rent.carrier2_id}`,
          'GET',
          (data) => setCarrier2(data.carrier),
          currentUser.token,
          signal,
          null,
          null,
        );
      }
    }

    setIsLoading(false);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [rent, currentUser.token]);

  const handleCarrier = (e, carrierId) => {
    e.preventDefault();
    history.push(`/carriers/${carrierId}`);
    dispatch(changeLastPage(`/rent/${rent.id}`));
  };

  return (
    <RentCarriersBox
      rent={rent}
      carrier1={carrier1}
      carrier2={carrier2}
      handleCarrier={handleCarrier}
      isLoading={isLoading}
    />
  );
};

export default RentCarriers;
