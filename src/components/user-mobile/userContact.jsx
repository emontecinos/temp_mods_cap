import React from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardMedia, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  cardFullHeight: {
    minHeight: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

const UserContact = (props) => {
  const { user } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/chats/${id}`);
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardMedia
        className={classes.media}
        image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
      <CardActions>
        <Button
          className={classes.cardHeader}
          color="primary"
          onClick={() => handleLink(user.id)}
          startIcon={<SendIcon />}
        >
          Enviar Mensaje
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserContact;
