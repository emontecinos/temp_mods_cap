import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CircularProgress from '@material-ui/core/CircularProgress';

import TractorIcon from '../../assets/icons/TractorIcon';

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

const RentMachine = (props) => {
  const { machine, handleMachine, handleUser, isLoading } = props;
  const classes = useStyles();

  const handlePrimary = (currentMachine) => {
    switch (currentMachine.type_name) {
      case 'type0':
        return `Tractor ${currentMachine.subtype_name} #${currentMachine.id}`;
      case 'type1':
        return `Implemento ${currentMachine.subtype_name} #${currentMachine.id}`;
      default:
        return `Otros ${currentMachine.subtype_name} #${currentMachine.id}`;
    }
  };

  const handleSecondary = (currentMachine) => {
    switch (currentMachine.type_name) {
      case 'type0':
        return ` — ${currentMachine.brand_name} - ${currentMachine.year}`;
      case 'type1':
        return ` — ${currentMachine.year}`;
      default:
        return ` — Otros - ${currentMachine.year}`;
    }
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.cardFullHeight}>
        <CardHeader
          title={
            <Typography color="textPrimary" variant="h6">
              Maquinaria Arrendada
            </Typography>
          }
        />
        <CardContent>
          {isLoading ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          ) : (
            <List className={classes.root}>
              <Grid>
                <ListItem
                  button
                  onClick={(e) => handleUser(e, machine.user_id)}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <Tooltip title="Arrendador">
                        <EmojiPeopleIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={machine.user_name}
                    secondary="Arrendador"
                  />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button onClick={(e) => handleMachine(e, machine.id)}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <TractorIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={handlePrimary(machine)}
                    secondary={
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
                    }
                  />
                </ListItem>
              </Grid>
            </List>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RentMachine;
