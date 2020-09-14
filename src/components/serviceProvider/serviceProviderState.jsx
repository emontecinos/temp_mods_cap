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

const ServiceProviderState = (props) => {
  const { serviceProvider, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={<Typography variant="h6">Estado de Disponibilidad</Typography>}
      />
      <CardContent>
        {isLoading || !serviceProvider.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid>
            {serviceProvider.active ? (
              <Typography align="center" color="secondary" variant="h5">
                Disponible
              </Typography>
            ) : (
              <Typography align="center" color="error" variant="h5">
                No disponible
              </Typography>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceProviderState;
