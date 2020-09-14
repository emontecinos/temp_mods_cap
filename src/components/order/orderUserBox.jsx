import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DirectionsWalkRoundedIcon from '@material-ui/icons/DirectionsWalkRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const OrderUser = (props) => {
  const { user, handleUser, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Arrendatario
          </Typography>
        }
      />
      <CardContent>
        {isLoading || !user.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <List className={classes.root}>
            <ListItem button onClick={(e) => handleUser(e, user.id)}>
              <ListItemAvatar>
                <Avatar>
                  <Tooltip title="Arrendatario">
                    <DirectionsWalkRoundedIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderUser;
