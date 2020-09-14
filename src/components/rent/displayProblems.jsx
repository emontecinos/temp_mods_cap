import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
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
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const DisplayProblems = (props) => {
  const { rent } = props;
  const [problems, setProblems] = useState([]);
  const classes = useStyles();

  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (rent.id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/orders/problems/${rent.id}`,
        'GET',
        (data) => setProblems(data.problemas),
        currentUser.token,
        signal,
        null,
        null,
      );
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser, rent]);
  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Problemas Reportados
          </Typography>
        }
      />
      <CardContent>
        {!rent.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <List className={classes.root}>
            {problems.length > 0 ? (
              problems.map((problem) => (
                <Grid key={`grid-${problem.id}`}>
                  <ListItem>
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
                  <ListItemText secondary="No existen problemas registrados" />
                </ListItem>
              </Grid>
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayProblems;
