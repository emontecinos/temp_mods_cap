import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

const ButtonGroup = () => {
  const history = useHistory();
  const redirectMenu = (event, index) => {
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('/users-web/register');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
        <Grid item xs={6}>
          <Button
            onClick={(e) => redirectMenu(e, 2)}
            float="left"
            variant="contained"
          >
            Registrar Usuario
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ButtonGroup;
