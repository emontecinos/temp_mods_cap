import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import effectAsyncHandler from '../../assets/async/asyncFunction';
import NameBanner from './nameBanner';
import RecentMovements from './recentMovements';
import RecentMessages from './recentMessages';

const useStyles = makeStyles((theme) => ({
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
  fullHeight: {
    width: '100%',
    height: '100%',
  },
}));

const Home = () => {
  const currentUser = useSelector((state) => state.userInformation);
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [messagesInfo, setMessagesInfo] = useState([]);
  const classes = useStyles();

  const handleResponse = (data) => {
    setOrdersInfo(data.homeData.orders);
    setMessagesInfo(data.homeData.messages);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/home`,
      'GET',
      handleResponse,
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  return (
    <Grid
      item
      container
      xs={12}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={3}
        md={8}
        sm={10}
        xs={12}
      >
        <Grid item xs={12} className={classes.fullHeight}>
          <NameBanner />
        </Grid>
        <Grid item xs={12}>
          {ordersInfo.length > 0 ? (
            <RecentMovements orders={ordersInfo} />
          ) : (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          {messagesInfo.length > 0 ? (
            <RecentMessages messages={messagesInfo} />
          ) : (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.spinner} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
