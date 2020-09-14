import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const ButtonGroup = (props) => {
  const { machine, setMachine } = props;
  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();

  const handleResponse = (response) => {
    if (response.status === 400) {
      setMachine({
        ...machine,
        error: { ...machine.error, alreadyExists: null },
      });
    } else if (response.status === 200) {
      setMachine({
        ...machine,
        error: { ...machine.error, alreadyExists: null },
        messageError: null,
      });
      history.push(`/machines`);
    } else {
      setMachine({
        ...machine,
        error: { ...machine.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const handleClickBlock = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admin-machines/${machine.id}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        archived: !machine.archived,
      }),
      event,
    );
    // setMachine({ ...machine, archived: !machine.archived });
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
        <Grid item xs={6}>
          <Button
            onClick={(e) => handleClickBlock(e)}
            float="left"
            variant="contained"
          >
            {machine.archived ? 'Habilitar Máquina' : 'Deshabilitar Máquina'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ButtonGroup;
