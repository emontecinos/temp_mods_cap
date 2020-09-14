import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AppleIcon from '@material-ui/icons/Apple';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PaymentIcon from '@material-ui/icons/Payment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import ConfirmationButtons from './confirmationButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  cardFullHeight: {
    height: '100%',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const getDescriptionPending = (type) => {
  switch (type) {
    case 'payment':
      return {
        primary: 'Confirmación del pago inicial',
        secondary: 'Es necesario confirmar el pago inicial del arriendo',
      };
    case 'in_progress':
      return {
        primary: 'Confirmación del inicio de la faena',
        secondary: 'Es necesario confirmar el comienzo de la faena',
      };
    case 'done':
      return {
        primary: 'Confirmación del término de la faena',
        secondary: 'Es necesario confirmar el término de la faena',
      };
    case 'paid':
      return {
        primary: 'Confirmación del pago final',
        secondary: 'Es necesario confirmar pago final del arriendo',
      };
    default:
      return { primary: '', secondary: '' };
  }
};

const getDescriptionDone = (type) => {
  switch (type) {
    case 'payment':
      return {
        primary: 'Confirmado el pago inicial',
        secondary: 'El arriendo ya recibió su pago inicial',
      };
    case 'in_progress':
      return {
        primary: 'Confirmado el inicio de la faena',
        secondary: 'La máquina ya se encuentra en faena',
      };
    case 'done':
      return {
        primary: 'Confirmado el término de la faena',
        secondary: 'La máquina ya finalizó la faena',
      };
    case 'paid':
      return {
        primary: 'Confirmado el pago final',
        secondary: 'El arriendo ya recibió su pago final',
      };
    default:
      return { primary: '', secondary: '' };
  }
};

const getDescriptions = (currentState) => {
  switch (currentState) {
    case 'carriers_confirmed':
      return {
        payment: getDescriptionPending('payment'),
        in_progress: getDescriptionPending('in_progress'),
        done: getDescriptionPending('done'),
        paid: getDescriptionPending('paid'),
      };
    case 'first_pay_confirmed':
      return {
        payment: getDescriptionDone('payment'),
        in_progress: getDescriptionPending('in_progress'),
        done: getDescriptionPending('done'),
        paid: getDescriptionPending('paid'),
      };
    case 'in_progress':
      return {
        payment: getDescriptionDone('payment'),
        in_progress: getDescriptionDone('in_progress'),
        done: getDescriptionPending('done'),
        paid: getDescriptionPending('paid'),
      };
    case 'done':
      return {
        payment: getDescriptionDone('payment'),
        in_progress: getDescriptionDone('in_progress'),
        done: getDescriptionDone('done'),
        paid: getDescriptionPending('paid'),
      };
    case 'pay':
      return {
        payment: getDescriptionDone('payment'),
        in_progress: getDescriptionDone('in_progress'),
        done: getDescriptionDone('done'),
        paid: getDescriptionDone('paid'),
      };
    default:
      return {
        payment: getDescriptionPending('payment'),
        in_progress: getDescriptionPending('in_progress'),
        done: getDescriptionPending('done'),
        paid: getDescriptionPending('paid'),
      };
  }
};

const DisplayActions = (props) => {
  const { rent, handleConfirmation, isLoading } = props;
  const classes = useStyles();

  const textos = getDescriptions(rent.state);

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Acciones
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
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Tooltip title="Confirmar Pago Inicial">
                    <PaymentIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={textos.payment.primary}
                secondary={textos.payment.secondary}
              />
              <ListItemSecondaryAction>
                {rent.state === 'carriers_confirmed' ? (
                  <ConfirmationButtons
                    confirmationType="payment"
                    handleConfirmation={handleConfirmation}
                  />
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Tooltip title="Confirmar Inicio Faena">
                    <AppleIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={textos.in_progress.primary}
                secondary={textos.in_progress.secondary}
              />
              <ListItemSecondaryAction>
                {rent.state === 'first_pay_confirmed' ? (
                  <ConfirmationButtons
                    confirmationType="in_progress"
                    handleConfirmation={handleConfirmation}
                  />
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Tooltip title="Confirmar Término Faena">
                    <DoneAllIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={textos.done.primary}
                secondary={textos.done.secondary}
              />
              <ListItemSecondaryAction>
                {rent.state === 'in_progress' ? (
                  <ConfirmationButtons
                    confirmationType="done"
                    handleConfirmation={handleConfirmation}
                  />
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Tooltip title="Confirmar Pago Final">
                    <PaymentIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={textos.paid.primary}
                secondary={textos.paid.secondary}
              />
              <ListItemSecondaryAction>
                {rent.state === 'done' ? (
                  <ConfirmationButtons
                    confirmationType="paid"
                    handleConfirmation={handleConfirmation}
                  />
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayActions;
