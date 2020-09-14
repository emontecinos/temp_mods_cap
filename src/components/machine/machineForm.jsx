import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuItem from '@material-ui/core/MenuItem';

import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: '0 1px',
    color: theme.palette.text.secondary,
  },
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
}));

const years = [];

for (let year = 2020; year > 1949; year -= 1) {
  years.push({ value: year.toString() });
}

const TypeForm = (props) => {
  const { data, setData, handleSubmit } = props;
  const classes = useStyles();
  const [machineTypes, setMachineTypes] = useState([]);
  const [machineSubTypes, setMachineSubTypes] = useState([]);
  const currentUser = useSelector((state) => state.userInformation);

  const handleChange = (e, target) => {
    e.preventDefault();
    setData({
      ...data,
      [target]: e.target.value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    let path = `${process.env.REACT_APP_API_URL}/api/v1/subtypes/type/${data.type_id}`;
    if (data.type_id === '') {
      path = `${process.env.REACT_APP_API_URL}/api/v1/subtypes`;
    }
    effectAsyncHandler(
      path,
      'GET',
      (info) => setMachineSubTypes(info.subTypes),
      currentUser.token,
      signal,
      null,
      null,
    );

    effectAsyncHandler(
      path,
      'GET',
      (info) => setMachineSubTypes(info.subTypes),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [data.type_id]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types`,
      'GET',
      (info) => setMachineTypes(info.types),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Editar Información
          </Typography>
        }
      />
      <CardContent className={classes.card__body}>
        <Grid container spacing={1}>
          <Grid item container alignItems="center" xs={5} p={2}>
            <TextField
              id="type"
              label="Tipo"
              variant="outlined"
              color="primary"
              value={data.type_id}
              select
              multiline
              rows={2}
              onChange={(e) => handleChange(e, 'type_id')}
              fullWidth
            >
              {machineTypes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item container alignItems="center" xs={5} p={2}>
            <TextField
              id="subtype"
              label="Subtipo"
              variant="outlined"
              color="primary"
              value={data.subtype_id}
              select
              multiline
              rows={2}
              onChange={(e) => handleChange(e, 'subtype_id')}
              fullWidth
            >
              {machineSubTypes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item container alignItems="center" xs={5} p={2}>
            <TextField
              id="year"
              label="Año"
              variant="outlined"
              color="primary"
              value={data.year}
              select
              multiline
              rows={2}
              onChange={(e) => handleChange(e, 'year')}
              fullWidth
            >
              {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item container alignItems="center" xs={6} p={1}>
            {data.incompleteForm ? (
              <Box display="flex" justifyContent="center" p={0}>
                <Alert severity="error">
                  Debes completar todos los campos!
                </Alert>
              </Box>
            ) : null}
            {data.error.alreadyExists ? (
              <Box display="flex" justifyContent="center" p={0}>
                <Alert severity="error">El tipo ya ha sido registrado!</Alert>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.card__actions}>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<EditRoundedIcon />}
          onClick={handleSubmit}
        >
          Actualizar Información
        </Button>
      </CardActions>
    </Card>
  );
};

export default TypeForm;
