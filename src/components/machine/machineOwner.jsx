import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    height: '100%',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const MachineOwner = (props) => {
  const { user } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/users-mobile/${id}`);
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardActionArea onClick={() => handleLink(user.id)}>
        <CardHeader title="Datos del Dueño" />
        <CardContent>
          {!user.id ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={1}>
              <Grid
                item
                container
                alignItems="center"
                xs={12}
                sm={6}
                md={12}
                p={1}
              >
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
              <Grid
                item
                container
                alignItems="center"
                xs={12}
                sm={6}
                md={12}
                p={1}
              >
                <Grid item>
                  <Tooltip title="RUT">
                    <RecentActorsIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Typography>{user.rut}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                xs={12}
                sm={6}
                md={12}
                p={1}
              >
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
            </Grid>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MachineOwner;
