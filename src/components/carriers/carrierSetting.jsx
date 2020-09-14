import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee',
    maxWidth: 500,
    padding: 16,
    paddingBottom: 0,
  },
});

const CarrierSetting = (props) => {
  // To manage the set of the values in login/index
  const {
    type, // Register or Edit
    carrier, // carrier information
    handleChange, // to manage changes
    handleEmail, // to check email
    handleSubmit, // Rise when the button is clicked
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          type === 'register'
            ? 'Registrar Nuevo Transportista'
            : 'Editar Transportista'
        }
        titleTypographyProps={{ variant: 'h5', align: 'center' }}
      />
      <CardContent>
        <Grid container p={2} spacing={4}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container p={0} spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Nombre"
                    variant="outlined"
                    color="primary"
                    value={carrier.name}
                    type="text"
                    onChange={(e) => handleChange(e, 'name')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    value={carrier.email}
                    type="text"
                    onChange={(e) => handleEmail(e)}
                    fullWidth
                  />
                </Grid>
                {carrier.error.emailError && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      Error en el formato del Email!
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    id="phone"
                    label="Telefono"
                    variant="outlined"
                    color="primary"
                    value={carrier.phone}
                    type="text"
                    onChange={(e) => handleChange(e, 'phone')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Dirección"
                    variant="outlined"
                    color="primary"
                    value={carrier.address}
                    type="text"
                    onChange={(e) => handleChange(e, 'address')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="carries"
                    label="Transporta"
                    variant="outlined"
                    color="primary"
                    value={carrier.carries}
                    type="text"
                    onChange={(e) => handleChange(e, 'carries')}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
          {carrier.incompleteForm && (
            <Grid item xs={12}>
              <Alert severity="error">Debes completar todos los campos</Alert>
            </Grid>
          )}
          {carrier.error.alreadyExists && (
            <Grid item xs={12}>
              <Alert severity="error">El email ya se encuentra en uso</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
            >
              <Typography variant="h5">
                {type === 'register' ? 'Registrar' : 'Actualizar'}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CarrierSetting;
