import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const ButtonGroup = (props) => {
  const { serviceProvider, idServiceProvider } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const history = useHistory();
  const id = idServiceProvider;
  const url = serviceProvider.active ? 'block' : 'unblock';

  const handleBlock = () => {
    history.push(`/serviceProviders`);
  };

  const blockServiceProvider = () => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/serviceProviders/${url}/${id}`,
      'PATCH',
      handleBlock,
      currentUser.token,
      null,
      null,
      null,
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
        <Grid item xs={6}>
          <Button
            onClick={() => history.push(`/serviceProviders/edit/${id}`)}
            float="left"
            variant="contained"
          >
            Editar Proveedor de Servicios
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => blockServiceProvider()}
            float="left"
            variant="contained"
          >
            {serviceProvider.active ? 'Bloquear' : 'Desbloquear'} Proveedor de
            Servicios
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ButtonGroup;
