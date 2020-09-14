import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    minHeight: '160px',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
}));

const CarrierState = (props) => {
  const { carrier, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={<Typography variant="h6">Estado de Disponibilidad</Typography>}
      />
      <CardContent>
        {isLoading || !carrier.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid>
            {carrier && (
              <Typography align="center" color="secondary" variant="h5">
                {carrier.active ? 'Disponible' : 'No disponible'}
              </Typography>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default CarrierState;
