import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import DisplayState from '../display/displayState';
import DisplayProblems from './displayProblems';
import RentDetails from './rentDetails';
import RentMachine from './rentMachine';
import AddMachine from './addMachine';
import AddCarrier from './addCarrier';
import RentCarriers from './rentCarriers';
import RentConfirmation from './rentConfirmation';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '25 25 25 25',
    backgroundColor: theme.palette.common.grey,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const RentCard = (props) => {
  const {
    rent,
    setAddFirstCarrier,
    setAddSecCarrier,
    setCurrentState,
    isLoading,
  } = props;

  const classes = useStyles();
  return (
    <Grid item container p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h4">Arriendo {rent.id} </Typography>}
          subheader={<Typography variant="h6">{rent.date}</Typography>}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid container spacing={2} justify="flex-start">
            <Grid item xs={12} md={7}>
              <DisplayState service={rent} isLoading={isLoading} type="rent" />
            </Grid>
            <Grid item xs={12} md={5}>
              <RentDetails rent={rent} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={7}>
              <RentConfirmation
                rent={rent}
                isLoading={isLoading}
                setCurrentState={setCurrentState}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <DisplayProblems rent={rent} />
            </Grid>
            {!rent.id ? (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <CircularProgress className={classes.spinner} />
                </Grid>
              </Grid>
            ) : (
              <>
                {rent.machine_id ? (
                  <>
                    <Grid item xs={12} md={7}>
                      <RentMachine rent={rent} />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <RentCarriers rent={rent} />
                    </Grid>
                    {rent.carrier_id || rent.self_transport ? null : (
                      <AddCarrier
                        rent={rent}
                        target="carrier_id"
                        titulo="Ida"
                        setAddCarrier={setAddFirstCarrier}
                        setCurrentState={setCurrentState}
                      />
                    )}
                    {rent.carrier2_id || rent.self_transport ? null : (
                      <AddCarrier
                        rent={rent}
                        target="carrier2_id"
                        titulo="Vuelta"
                        setAddCarrier={setAddSecCarrier}
                        setCurrentState={setCurrentState}
                      />
                    )}
                  </>
                ) : (
                  <AddMachine rent={rent} setCurrentState={setCurrentState} />
                )}
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RentCard;
