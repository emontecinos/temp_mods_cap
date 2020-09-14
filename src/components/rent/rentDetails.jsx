import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Moment from 'moment';
import ButtonBase from '@material-ui/core/ButtonBase';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import StopIcon from '@material-ui/icons/Stop';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import { changeLastPage } from '../../redux/actions';

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

const formatter = new Intl.NumberFormat('es-CL', {
  currency: 'CLP',
  style: 'currency',
});

const RentDetails = (props) => {
  const { rent, isLoading } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUser = (e, userId) => {
    e.preventDefault();

    history.push(`/users-mobile/${userId}`);
    dispatch(changeLastPage(`/rent/${rent.id}`));
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Detalles del Arriendo
          </Typography>
        }
      />
      <CardContent>
        {isLoading || !rent.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item container alignItems="center" xs={6} p={1}>
              <ButtonBase
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={(e) => handleUser(e, rent.user_id)}
              >
                <Grid item>
                  <Tooltip title="Arrendatario">
                    <EmojiPeopleIcon className={classes.icon} />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Typography>
                    {rent.user_name || 'Falta información'}
                  </Typography>
                </Grid>
              </ButtonBase>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Costo">
                  <MonetizationOnIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {formatter.format(rent.total_cost) || 'Falta información'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Categoría">
                  <CategoryRoundedIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>{rent.type_name || 'Falta información'}</Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Subategoría">
                  <StopIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {rent.subtype_name || 'Falta información'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Fecha de Inicio">
                  <DateRangeRoundedIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {Moment.utc(rent.start_date).format('MMM DD, YYYY') ||
                    'Falta información'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={6} p={1}>
              <Grid item>
                <Tooltip title="Fecha de Término">
                  <DateRangeRoundedIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>
                  {Moment.utc(rent.end_date).format('MMM DD, YYYY') ||
                    'Falta información'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default RentDetails;
