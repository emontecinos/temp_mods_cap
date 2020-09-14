import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const RecentMessagesCard = (props) => {
  const { chat } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/chats/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => handleLink(chat.user_id)}>
        <CardContent>
          <Typography variant="h5">Usuario: {chat.user_id}</Typography>
          <Typography variant="body2" component="p">
            <b>Hora:</b> {moment(+chat.timestamp).format('LLL')}
          </Typography>
          <Typography variant="body2" component="p">
            <b>Mensaje:</b> {chat.message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecentMessagesCard;
