import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    minHeight: '100%',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
}));

const OwnerInfo = (props) => {
  const { user, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Información del Usuario" />
      <CardContent>
        {isLoading || !user.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item container alignItems="center" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Nombre">
                  <AccountBoxIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {user.name} {user.lastname}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="RUT">
                  <RecentActorsIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>{user.rut}</Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Teléfono">
                  <PhoneIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {user.phone ? user.phone : 'Falta información'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Empresa">
                  <BusinessCenterIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                {user.company_name ? user.company_name : 'Particular'}
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnerInfo;
