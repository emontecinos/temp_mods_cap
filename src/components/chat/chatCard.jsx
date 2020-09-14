import React from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: 'auto',
    height: theme.chat.list.maxHeight,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  message: {
    maxWidth: '80%',
  },
  operatorMessage: {
    maxWidth: '80%',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  date: {
    textAlign: 'center',
  },
  form: {
    marginTop: '16px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const ChatCard = (props) => {
  const { data, dataUser, textValue, setTextValue, handleSend } = props;
  const classes = useStyles();
  const history = useHistory();
  let actualDate;

  const NewDate = (timestamp) => {
    const date = moment(+timestamp).format('DD MMM YYYY');
    if (date !== actualDate) {
      actualDate = date;
      return true;
    }
    return false;
  };

  const displayMessage = (message) => {
    return message.fromAdmin ? (
      <ListItem className={classes.operatorMessage}>
        <ListItemText
          primary={message.message}
          secondary={moment(+message.timestamp).format('h:mm')}
        />
      </ListItem>
    ) : (
      <ListItem className={classes.message}>
        <ListItemText
          primary={message.message}
          secondary={moment(+message.timestamp).format('h:mm')}
        />
      </ListItem>
    );
  };

  return (
    <Grid item p={10} m={10}>
      <Card>
        <CardActionArea
          onClick={() => history.push(`/users-mobile/${dataUser.id}`)}
        >
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {String(dataUser.name).charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              dataUser.lastname
                ? `${dataUser.name} ${dataUser.lastname}`
                : dataUser.name
            }
            titleTypographyProps={{ variant: 'h4' }}
          />
        </CardActionArea>
        <CardContent>
          <List className={classes.list}>
            {data.map((message) =>
              NewDate(message.timestamp) ? (
                <div key={message.timestamp}>
                  <ListItem>
                    <ListItemText
                      secondary={moment(+message.timestamp).format('LL')}
                      className={classes.date}
                    />
                  </ListItem>
                  {displayMessage(message)}
                </div>
              ) : (
                <div key={message.timestamp}>{displayMessage(message)}</div>
              ),
            )}
          </List>

          <form onSubmit={(e) => handleSend(e)}>
            <Paper className={classes.form}>
              <InputBase
                className={classes.input}
                placeholder="Envía un mensaje"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                color="primary"
                className={classes.iconButton}
                onClick={(e) => handleSend(e)}
              >
                <SendIcon />
              </IconButton>
            </Paper>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChatCard;
