import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DisplayTypes from './displayTypes';
import RegisterType from './typeRegister';

const Types = () => {
  const history = useHistory();

  const handleType = (e, typeId) => {
    e.preventDefault();
    history.push(`/types/${typeId}`);
  };

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={12} p={2}>
        <DisplayTypes handleType={handleType} />
      </Grid>
      <Grid item xs={12} p={10}>
        <RegisterType />
      </Grid>
    </Grid>
  );
};

export default Types;
