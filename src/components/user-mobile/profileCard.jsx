import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import UserContact from './userContact';
import TarjetaInfo from './userInfo';
import UserOrders from './userOrders';
import UserMachines from './userMachines';
import UserProblems from './userProblems';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '25 25 25 25',
    backgroundColor: theme.palette.common.grey,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
}));

const UserCard = (props) => {
  const { user, isLoading } = props;
  const classes = useStyles();

  return (
    <Grid item p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={user.lastname ? `${user.name} ${user.lastname}` : user.name}
          titleTypographyProps={{ variant: 'h4' }}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid container spacing={2} justify="flex-start" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <UserContact user={user} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TarjetaInfo user={user} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserOrders user={user} />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserMachines user={user} />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserProblems user={user} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserCard;
