import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const ButtonGroup = (props) => {
  const classes = useStyles();
  const { carrier, idCarrier } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const history = useHistory();
  const id = idCarrier;
  const url = carrier.active ? 'block' : 'unblock';

  const blockCarrier = () => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/carriers/${url}/${id}`,
      'PATCH',
      () => history.push(`/carriers`),
      currentUser.token,
      null,
      null,
      null,
    );
  };

  return (
    <Grid
      container
      className={classes.root}
      xs={12}
      direction="row"
      justify="space-between"
    >
      <Grid item>
        <Button
          onClick={() => history.push(`/carriers/edit/${id}`)}
          float="left"
          variant="contained"
        >
          Editar Transportista
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => blockCarrier()} float="left" variant="contained">
          {carrier.active ? 'Bloquear' : 'Desbloquear'} Transportista
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonGroup;
