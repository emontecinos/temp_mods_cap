import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

const ConfirmationButtons = (props) => {
  const { confirmationType, handleConfirmation } = props;
  const [openCheck, setOpenCheck] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClickOpenCheck = () => {
    setOpenCheck(true);
  };

  const handleClickOpenError = () => {
    setOpenError(true);
  };

  const handleCloseCheck = (target) => {
    if (target === 'close') {
      setOpenCheck(false);
    } else {
      handleConfirmation(target);
      setOpenCheck(false);
    }
  };

  const handleCloseError = (target) => {
    if (target === 'close') {
      setOpenError(false);
    } else {
      handleConfirmation('error');
      setOpenError(false);
    }
  };

  const titleConfirmation = (type) => {
    switch (type) {
      case 'payment':
        return 'Confirmación del Pago Previo';
      case 'in_progress':
        return 'Confirmación del Inicio de la Faena';
      case 'done':
        return 'Confirmación del Término de la Faena';
      case 'paid':
        return 'Confirmación del Pago Final';
      default:
        return 'Registrar Problema';
    }
  };

  const dialogConfirmation = (type) => {
    switch (type) {
      case 'payment':
        return 'Vas a confirmar el pago previo del arriendo por parte del arrendatario';
      case 'in_progress':
        return 'Vas a confirmar el inicio del trabajo de la máquina';
      case 'done':
        return 'Vas a confirmar el término del trabajo de la máquina';
      case 'paid':
        return 'Vas a confirmar el pago final del arriendo por parte del arrendatario y dar por cerrado el pedido';
      default:
        return 'Vas a señalar que hay un error en la fase actual del arriendo';
    }
  };

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpenError}>
        <CancelIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpenCheck}>
        <CheckIcon />
      </IconButton>
      <Dialog
        open={openCheck}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleConfirmation(confirmationType)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogConfirmation(confirmationType)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseCheck('close')} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleCloseCheck(confirmationType)}
            color="primary"
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleConfirmation()}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogConfirmation()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseError('close')} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleCloseError(confirmationType)}
            color="primary"
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationButtons;
