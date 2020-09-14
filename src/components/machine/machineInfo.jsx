import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import CategoryIcon from '@material-ui/icons/Category';
import StopIcon from '@material-ui/icons/Stop';
import TodayIcon from '@material-ui/icons/Today';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import EditRoundedIcon from '@material-ui/icons/EditRounded';

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

const MachineInfo = (props) => {
  const { machine, isLoading, handleEdit } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Información Maquinaria" />
      <CardContent>
        {isLoading || !machine.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item container alignItems="flex-start" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Tipo">
                  <CategoryIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>{machine.type_name}</Typography>
                <Typography variant="body2">
                  {machine.type_description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-start" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Subtipo">
                  <StopIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>{machine.subtype_name}</Typography>
                <Typography variant="body2">
                  {machine.subtype_description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-start" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Año de la máquina">
                  <TodayIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>{machine.year}</Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-start" xs={12} sm={6} p={1}>
              <Grid item>
                <Tooltip title="Precio">
                  <MonetizationOnIcon className={classes.icon} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography>$ {machine.subtype_price} /día</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<EditRoundedIcon />}
          onClick={handleEdit}
        >
          Editar Información
        </Button>
      </CardActions>
    </Card>
  );
};

export default MachineInfo;
