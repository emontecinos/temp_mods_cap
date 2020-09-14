import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import MachineOwner from './machineOwner';
import MachineInfo from './machineInfo';
import MachineState from './machineState';
import MachineRents from './machineRents';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import EditMachine from './machineEdit';

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

const MachineCard = (props) => {
  const { machine, isLoading, editState, setEditState } = props;
  const classes = useStyles();
  const [user, setUser] = useState('');
  const currentUser = useSelector((state) => state.userInformation);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (machine.user_id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins-users/${machine.user_id}`,
        'GET',
        (data) => setUser(data.user),
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
  }, [machine.user_id]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditState(true);
  };

  return (
    <Grid item p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={`Máquina #${machine.id}`}
          subheader={`${machine.model_name} - ${machine.brand_name}`}
          style={{ color: 'white' }}
          titleTypographyProps={{
            variant: 'h4',
          }}
          subheaderTypographyProps={{
            variant: 'h6',
          }}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid container spacing={2} justify="flex-start" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <MachineState machine={machine} isLoading={isLoading} />
            </Grid>
            {editState ? (
              <Grid item xs={12} md={8}>
                <EditMachine
                  setEditState={setEditState}
                  idMachine={machine.id}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={8}>
                <MachineInfo
                  machine={machine}
                  isLoading={isLoading}
                  handleEdit={handleEdit}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <MachineOwner user={user} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MachineRents machine={machine} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MachineCard;
