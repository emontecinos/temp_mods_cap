import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    height: '100%',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  spinner: {
    position: 'relative',
    top: '50%',
    left: '50%',
    zIndex: 100,
  },
}));

const DriverState = (props) => {
  const { machine, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardMedia
        className={classes.media}
        image={
          machine.image_url
            ? machine.image_url
            : 'https://www.dentallink.com.uy/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'
        }
      />
      <CardContent>
        {isLoading || !machine.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Typography
            align="center"
            color={machine.available ? 'secondary' : 'error'}
            variant="h5"
          >
            {machine.available ? 'Disponible' : 'No Disponible'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverState;
