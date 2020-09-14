import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee',
    maxWidth: 325,
    padding: 16,
    paddingBottom: 0,
  },
  forgotPassword: {
    paddingTop: 16,
    paddingBottom: 0,
  },
});

const LoginForm = (props) => {
  // To manage the set of the values in login/index
  const {
    user,
    handleChange,
    handleEmail,
    handleSubmit,
    handleClickShowPassword,
    redirectMenu,
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Ingrese su Usuario"
        titleTypographyProps={{ variant: 'h5', align: 'center' }}
      />
      <CardContent>
        <Grid container p={2} spacing={4}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container p={0} spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    value={user.email}
                    type="text"
                    onChange={(e) => handleEmail(e)}
                    fullWidth
                  />
                </Grid>
                {user.error.emailValidation && (
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
                      onChange={(e) => handleChange(e, 'password')}
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
              </Grid>
            </form>
          </Grid>
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
              <Typography variant="h5">Ingresar</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.forgotPassword}
          >
            <Button
              onClick={(e) => redirectMenu(e, 2)}
              color="primary"
              fullWidth
            >
              Recuperar Constraseña
            </Button>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
