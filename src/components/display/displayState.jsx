import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DisplayPhase from './displayPhase';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    height: '100%',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const DisplayState = (props) => {
  const { service, type, isLoading } = props;
  const classes = useStyles();

  const showState = (currentService) => {
    if (currentService.has_problem) {
      return (
        <Typography align="center" color="error" variant="h5">
          Problema Reportado
        </Typography>
      );
    }

    if (currentService.state === 'paid') {
      return (
        <Typography align="center" variant="h5">
          Terminado
        </Typography>
      );
    }
    return (
      <Typography align="center" color="secondary" variant="h5">
        Activo
      </Typography>
    );
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography variant="h6">
            Estado del {type === 'service' ? 'Servicio' : 'Arriendo'}
          </Typography>
        }
      />
      <CardContent>
        {isLoading || !service.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <>
            {showState(service)}
            <Grid>
              <DisplayPhase rent={service} />
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayState;
