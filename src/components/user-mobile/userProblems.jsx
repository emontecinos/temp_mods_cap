import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
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

const ListMachines = (props) => {
  const { user } = props;
  const classes = useStyles();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.userInformation);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (user.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/user/problems/${user.id}`,
        'GET',
        (data) => setProblems(data.problemas),
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
  }, [currentUser, user]);

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader title="Problemas Reportados" />
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
              {problems.length > 0 ? (
                problems.map((problem) => (
                  <Grid key={`grid-${problem.id}`}>
                    <ListItem
                      button
                      onClick={() => history.push(`/rent/${problem.order_id}`)}
                    >
                      <ListItemText
                        primary={problem.problem_description}
                        secondary={problem.category}
                      />
                    </ListItem>
                    <Divider />
                  </Grid>
                ))
              ) : (
                <Grid>
                  <ListItem>
                    <ListItemText secondary="El usuario no tiene problemas registrados" />
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

export default ListMachines;
