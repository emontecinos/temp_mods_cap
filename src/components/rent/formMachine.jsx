import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import TractorIcon from '../../assets/icons/TractorIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    height: theme.card.divWithActions.height,
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
    justifyContent: 'flex-start',
  },
}));

const FormMachine = (props) => {
  const { machine, handleDeleteMachine, handleAddMachine } = props;
  const classes = useStyles();

  const handlePrimary = (currentMachine) => {
    switch (currentMachine.type_name) {
      case 'type0':
        return `Tractor ${currentMachine.subtype_name} #${currentMachine.id}`;
      case 'type1':
        return `Implemento ${currentMachine.subtype_name} #${currentMachine.id}`;
      default:
        return ``;
    }
  };

  const handleSecondary = (currentMachine) => {
    switch (currentMachine.type_name) {
      case 'type0':
        return ` — ${currentMachine.brand_name} - ${currentMachine.year}`;
      case 'type1':
        return ` — ${currentMachine.year}`;
      default:
        return currentMachine.year
          ? ` — Otros - ${currentMachine.year}`
          : ' — Otros';
    }
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Agregar Maquinaria
          </Typography>
        }
      />
      <CardContent>
        <List className={classes.root}>
          <Grid key={`grid-machine-${machine.id}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <TractorIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  machine.year ? handlePrimary(machine) : 'Sin Máquina Asignada'
                }
                secondary={
                  machine.year && (
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {machine.model_name}
                      </Typography>
                      {handleSecondary(machine)}
                    </>
                  )
                }
              />
            </ListItem>
          </Grid>
        </List>
      </CardContent>
      <CardActions className={classes.card__actions}>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<ClearIcon />}
          onClick={handleDeleteMachine}
        >
          Descartar
        </Button>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddMachine}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormMachine;
