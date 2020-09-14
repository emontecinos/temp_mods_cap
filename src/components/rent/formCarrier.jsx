import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    height: theme.card.divWithActions.height,
  },
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
}));

const FormCarrier = (props) => {
  const { carrier, handleDeleteCarrier, handleAddCarrier, titulo } = props;
  const classes = useStyles();

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Agregar Transportista {titulo}
          </Typography>
        }
      />
      <CardContent>
        <List className={classes.root}>
          <Grid key={`grid-carrier-${carrier.id}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Tooltip title="Transportista">
                    {titulo === 'Ida' ? (
                      <ArrowForwardIcon />
                    ) : (
                      <ArrowBackIcon />
                    )}
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={carrier.name || 'Sin Transportista Asignado'}
                secondary={carrier.carries}
              />
            </ListItem>
          </Grid>
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<ClearIcon />}
          onClick={handleDeleteCarrier}
        >
          Descartar
        </Button>
        <Button
          size="small"
          disableRipple
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCarrier}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormCarrier;
