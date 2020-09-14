import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  card__body: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  card__actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    margin: '0 1px',
    color: theme.palette.text.secondary,
  },
}));

const SettingOrder = (props) => {
  // To manage the set of the values in login/index
  const {
    order, // order information
    handleChange, // to manage changes
    handleSubmit, // Rise when the button is clicked
    users, // existing mobile users
    machineTypes, // existing machine categories
    machineSubTypes, // existing machine subcategories
    handleSubmitMachine, // submit but add another machine
    newMachine: lastMachine,
  } = props;
  // const lastMachine = order.orders[order.orders.length - 1];
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={<Typography variant="h5">Agregar Arriendo</Typography>}
        className={classes.cardHeader}
      />
      <CardContent className={classes.card__body}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Usuario
              </InputLabel>
              <Select
                native
                onChange={(e) => handleChange(e, 'id')}
                label="Usuario"
              >
                <option aria-label="None" value="" />
                {users.map((mobileUser) => (
                  <option value={mobileUser.id} key={mobileUser.id}>
                    ID: {mobileUser.id} | {mobileUser.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={lastMachine.id_type > 0 ? 6 : 12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Tipo de Máquina
              </InputLabel>
              <Select
                native
                onChange={(e) => handleChange(e, 'id_type')}
                label="Tipo de máquina"
                value={lastMachine.id_type}
                labelWidth={85}
              >
                <option aria-label="None" value="" />
                {machineTypes.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {lastMachine.id_type > 0 && (
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Subtipo de Máquina
                </InputLabel>
                <Select
                  native
                  onChange={(e) => handleChange(e, 'id_subtype')}
                  label="Subtipo"
                  value={lastMachine.id_subtype}
                  labelWidth={95}
                >
                  <option aria-label="None" value="" />
                  {machineSubTypes.map((type) => (
                    <option value={type.id} key={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                id="date"
                label="Fecha inicio"
                type="date"
                value={lastMachine.start_date}
                onChange={(e) => handleChange(e, 'start_date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                id="end_date"
                label="Fecha Fin"
                type="date"
                value={lastMachine.end_date}
                onChange={(e) => handleChange(e, 'end_date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          {order.incompleteForm && (
            <Grid item xs={12}>
              <Alert severity="error">Debes completar todos los campos</Alert>
            </Grid>
          )}
          {order.invalidPeriod && (
            <Grid item xs={12}>
              <Alert severity="error">Debes elegir un periodo válido</Alert>
            </Grid>
          )}
          {order.missingMachines && (
            <Grid item xs={12}>
              <Alert severity="error">Debes agregar al menos una máquina</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <CardActions className={classes.card__actions}>
              <Button
                size="large"
                disableRipple
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleSubmitMachine}
              >
                Agregar Arriendo
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.card__actions}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          <Typography variant="h5">Crear</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SettingOrder;
