import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import RecentMessagesCard from './recentMessagesCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const RecentMessages = (props) => {
  const { messages } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">Últimos mensajes</Typography>
        </CardContent>
      </CardActionArea>
      {messages && (
        <CardActions>
          <Grid item container xs={12} spacing={1}>
            {messages.map((message) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={`home-message-grid$ ${message.id}`}
                >
                  <RecentMessagesCard
                    chat={message}
                    key={`home-message$ ${message.id}`}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

export default RecentMessages;
