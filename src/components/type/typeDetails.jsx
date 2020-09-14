import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import EditRoundedIcon from '@material-ui/icons/EditRounded';

const useStyles = makeStyles((theme) => ({
  cardFullHeight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  card__body: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  card__actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    margin: '0 8px',
    color: theme.palette.text.secondary,
  },
}));

const TypeDetails = (props) => {
  const { data, handleEdit, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Descripción
          </Typography>
        }
      />
      <CardContent className={classes.card__body}>
        {isLoading || !data.id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <Grid container p={1} direction="column" justify="space-between">
            <Grid item container alignItems="center" xs={12} p={1}>
              <Grid item>
                <Typography color="textPrimary" variant="h6">
                  {data.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
      <CardActions className={classes.card__actions}>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<EditRoundedIcon />}
          onClick={handleEdit}
        >
          Editar Tipo
        </Button>
      </CardActions>
    </Card>
  );
};

export default TypeDetails;
