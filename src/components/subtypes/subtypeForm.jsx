import React from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

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

const SubtypeForm = (props) => {
  const { state, setSubtype, subtype, handleSubmit } = props;
  const classes = useStyles();

  const handleChange = (e, target) => {
    e.preventDefault();
    setSubtype({
      ...subtype,
      [target]: e.target.value,
    });
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            {state === 'register' ? 'Registrar Nuevo' : 'Editar'} Subtipo
          </Typography>
        }
      />
      <CardContent className={classes.card__body}>
        <Grid container spacing={1}>
          <Grid item container alignItems="center" xs={12} md={4} p={2}>
            <TextField
              id="name"
              label="Nombre"
              variant="outlined"
              color="primary"
              value={subtype.name}
              type="text"
              multiline
              onChange={(e) => handleChange(e, 'name')}
              fullWidth
            />
          </Grid>
          <Grid item container alignItems="center" xs={12} md={4} p={2}>
            <TextField
              id="price"
              label="Precio Diario"
              variant="outlined"
              color="primary"
              multiline
              value={subtype.price}
              type="number"
              onChange={(e) => handleChange(e, 'price')}
              fullWidth
            />
          </Grid>
          <Grid item container alignItems="center" xs={12} md={4} p={2}>
            <TextField
              id="weekly_price"
              label="Precio Semanal"
              variant="outlined"
              color="primary"
              multiline
              value={subtype.weekly_price}
              type="number"
              onChange={(e) => handleChange(e, 'weekly_price')}
              fullWidth
            />
          </Grid>
          <Grid item container alignItems="center" xs={12} p={2}>
            <TextField
              id="description"
              label="Descripción"
              variant="outlined"
              color="primary"
              multiline
              rows={1}
              value={subtype.description}
              type="text"
              onChange={(e) => handleChange(e, 'description')}
              fullWidth
            />
          </Grid>
          <Grid item container alignItems="center" xs={6} p={1}>
            {subtype.incompleteForm ? (
              <Box display="flex" justifyContent="center" p={0}>
                <Alert severity="error">
                  Debes completar todos los campos!
                </Alert>
              </Box>
            ) : null}
            {subtype.error.alreadyExists ? (
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
          startIcon={
            state === 'register' ? <AddCircleIcon /> : <EditRoundedIcon />
          }
          onClick={handleSubmit}
        >
          {state === 'register' ? 'Registrar' : 'Actualizar'} Subtipo
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubtypeForm;
