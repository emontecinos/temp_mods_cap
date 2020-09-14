import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee',
    maxWidth: 500,
    padding: 16,
    paddingBottom: 0,
  },
});

const SettingUser = (props) => {
  // To manage the set of the values in login/index
  const {
    type, // Register or Edit
    user, // user information
    handleChange, // to manage changes
    handleEmail, // to check email
    handleClickShowPassword, // Show password and confirmation
    handlePassword, // If password and confirmation are the same
    handleConfirmation,
    handleSubmit, // Rise when the button is clicked
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          type === 'register' ? 'Registrar Nuevo Usuario' : 'Editar Usuario'
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
                    value={user.name}
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
                    value={user.email}
                    type="text"
                    onChange={
                      type !== 'register' ? null : (e) => handleEmail(e)
                    }
                    fullWidth
                  />
                </Grid>
                {user.error.emailError && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      Error en el formato del Email
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Contraseña
                    </InputLabel>
                    <OutlinedInput
                      type={user.showPassword ? 'text' : 'password'}
                      value={user.password}
                      onChange={handlePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {user.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={85}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Repetir Constraseña
                    </InputLabel>
                    <OutlinedInput
                      type={user.showPassword ? 'text' : 'password'}
                      value={user.confirmation}
                      onChange={handleConfirmation}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {user.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={150}
                    />
                  </FormControl>
                </Grid>
                {user.error.passwordError && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      Las constraseñas no son iguales
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Tipo de Usuario
                    </InputLabel>
                    <Select
                      native
                      onChange={(e) => handleChange(e, 'type')}
                      label="Tipo de Usuario"
                    >
                      <option aria-label="None" value="" />
                      <option value="admin">Administrador</option>
                      <option value="operator">Operario</option>
                      <option value="observer">Observador</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {user.incompleteForm && (
            <Grid item xs={12}>
              <Alert severity="error">Debes completar todos los campos</Alert>
            </Grid>
          )}
          {user.error.allReadyExist && (
            <Grid item xs={12}>
              <Alert severity="error">El email ya se encuentra en uso</Alert>
            </Grid>
          )}
          {user.error.userValidation && (
            <Grid item xs={12}>
              <Alert severity="error">
                El usuario o la contraseña son incorrectos
              </Alert>
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

export default SettingUser;
