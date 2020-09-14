import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

const RentCarriers = (props) => {
  const { rent, carrier1, carrier2, handleCarrier, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Transportistas Asignados
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
            <ListItem
              button
              onClick={
                carrier1.name ? (e) => handleCarrier(e, carrier1.id) : null
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Tooltip title="Transportista ida">
                    <ArrowForwardIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  rent.self_transport
                    ? 'Transporte Propio'
                    : carrier1.name || 'Sin transportista asignado'
                }
                secondary={carrier1.phone || '-'}
              />
            </ListItem>
            <Divider variant="inset" />
            <ListItem
              button
              onClick={
                carrier2.name ? (e) => handleCarrier(e, carrier2.id) : null
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Tooltip title="Transportista vuelta">
                    <ArrowBackIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  rent.self_transport
                    ? 'Transporte Propio'
                    : carrier2.name || 'Sin transportista asignado'
                }
                secondary={carrier2.phone || '-'}
              />
            </ListItem>
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RentCarriers;
