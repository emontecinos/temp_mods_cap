/* eslint-disable react/no-array-index-key */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'moment';
import TractorIcon from '../../assets/icons/TractorIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  cardFullHeight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const MachineList = (props) => {
  const { order, setOrder, machineSubTypes } = props;
  const classes = useStyles();

  const handleDelete = (e, index) => {
    setOrder((prevState) => {
      const machineList = prevState.orders;
      machineList.splice(index, 1);
      return { ...prevState, orders: machineList };
    });
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={<Typography variant="h5">Arriendos Agregados</Typography>}
      />
      <CardContent>
        <List className={classes.root}>
          {order.orders.length > 0 ? (
            order.orders.map((machine, index) => (
              <ListItem key={`element-${machine.id_subtype}-${index}`}>
                <ListItemAvatar>
                  <Avatar>
                    <TractorIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    machineSubTypes.filter(
                      (subType) => String(subType.id) === machine.id_subtype,
                    )[0].name
                  }
                  secondary={`${Moment.utc(machine.start_date).format(
                    'DD/MM/YYYY',
                  )} - ${Moment.utc(machine.end_date).format('DD/MM/YYYY')}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => handleDelete(e, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem key="empty">No has agreado arriendos aún</ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default MachineList;
