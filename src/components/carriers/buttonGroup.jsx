import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

const ButtonGroup = () => {
  const history = useHistory();

  return (
    <div style={{ width: '100%' }}>
      <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
        <Grid item xs={6}>
          <Button
            onClick={() => history.push('/carriers/register')}
            float="left"
            variant="contained"
          >
            Registrar Transportista
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ButtonGroup;
