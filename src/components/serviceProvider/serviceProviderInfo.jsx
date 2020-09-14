import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    minHeight: '150px',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
}));

const ServiceProviderInfo = (props) => {
  const { serviceProvider, isLoading } = props;
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.cardFullHeight}>
        <CardHeader
          title={
            <Typography color="textPrimary" variant="h6">
              Datos del Proveedor de Servicios
            </Typography>
          }
        />
        <CardContent>
          {isLoading || !serviceProvider.id ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          ) : (
            <Grid container p={1}>
              <Grid item container alignItems="center" xs={12} sm={6} p={1}>
                <Grid item>
                  <Tooltip title="Teléfono">
                    <PhoneIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>{serviceProvider.phone}</Grid>
              </Grid>
              <Grid item container alignItems="center" xs={12} sm={6} p={1}>
                <Grid item>
                  <Tooltip title="Email">
                    <MailOutlineRoundedIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>{serviceProvider.email}</Grid>
              </Grid>
              <Grid item container alignItems="center" xs={12} sm={6} p={1}>
                <Grid item>
                  <Tooltip title="Procedencia">
                    <PlaceOutlinedIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>{serviceProvider.address}</Grid>
              </Grid>
              <Grid item container alignItems="center" xs={12} sm={6} p={1}>
                <Grid item>
                  <Tooltip title="Tipo de Transporte">
                    <LocalShippingOutlinedIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>{serviceProvider.service_type}</Grid>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ServiceProviderInfo;
