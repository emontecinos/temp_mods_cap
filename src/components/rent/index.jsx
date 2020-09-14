import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import RentCard from './rentCard';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const styles = {
  grid: { marginTop: '1%' },
};

const Rent = (props) => {
  const [rent, setRent] = useState('');
  const [addFstCarrier, setAddFstCarrier] = useState(false);
  const [addSecCarrier, setAddSecCarrier] = useState(false);
  const [currentState, setCurrentState] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const { match } = props;
  const idRent = match.params.id;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/${idRent}`,
      'GET',
      (data) => setRent(data.order),
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
  }, [idRent, currentUser, addFstCarrier, addSecCarrier, currentState]);

  const handleReturn = (e) => {
    e.preventDefault();
    history.push(`/orders/${rent.group_id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justify="center"
      style={styles.grid}
    >
      <RentCard
        rent={rent}
        setAddFirstCarrier={setAddFstCarrier}
        setAddSecCarrier={setAddSecCarrier}
        setCurrentState={setCurrentState}
        handleReturn={handleReturn}
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default Rent;
