import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Moment from 'moment';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import effectAsyncHandler from '../../assets/async/asyncFunction';

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
}));

const CarrierRents = (props) => {
  const { carrier } = props;
  const classes = useStyles();
  const [rents, setRents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (carrier.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/carrier/${carrier.id}`,
        'GET',
        (data) => setRents(data.orders),
        currentUser.token,
        signal,
        null,
        null,
        'Machine',
      );

      setIsLoading(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser, carrier]);

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Viajes del Transportista" />
      <CardContent>
        <List className={classes.root}>
          {isLoading ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          ) : (
            <>
              {rents.length > 0 ? (
                rents.map((rent) => (
                  <Grid key={`grid-${rent.id}`}>
                    <ListItem
                      button
                      onClick={() => history.push(`/rent/${rent.id}`)}
                    >
                      <ListItemText
                        primary={`Arriendo #${rent.id}`}
                        secondary={`${Moment.utc(rent.start_date).format(
                          'DD MMM YYYY',
                        )} - ${Moment.utc(rent.end_date).format(
                          'DD MMM YYYY',
                        )}`}
                      />
                    </ListItem>
                    <Divider />
                  </Grid>
                ))
              ) : (
                <Grid>
                  <ListItem>
                    <ListItemText secondary="El Transportista no tiene viajes" />
                  </ListItem>
                </Grid>
              )}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default CarrierRents;
