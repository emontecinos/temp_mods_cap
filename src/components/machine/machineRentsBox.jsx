import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  avatar: {
    backgroundColor: theme.palette.text.secondary,
  },
  cardFullHeight: {
    height: '100%',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const ListOrders = (props) => {
  const { rents, handleRent, isLoadingRents } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Arriendos" />
      <CardContent>
        {isLoadingRents || rents === ' ' ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <List className={classes.root}>
            {rents.length > 0 ? (
              rents.map((rent) => (
                <Grid key={`grid-${rent.id}`}>
                  <ListItem button onClick={(e) => handleRent(e, rent.id)}>
                    <ListItemText
                      primary={`Arriendo #${rent.id} `}
                      secondary={`${Moment.utc(rent.start_date).format(
                        'DD MMMM YYYY',
                      )} - ${Moment.utc(rent.end_date).format('DD MMM YYYY')}`}
                    />
                  </ListItem>
                  <Divider />
                </Grid>
              ))
            ) : (
              <Grid>
                <ListItem>
                  <ListItemText secondary="El usuario no tiene pedidos." />
                </ListItem>
              </Grid>
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ListOrders;
