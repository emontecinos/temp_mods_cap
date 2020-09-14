import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import TractorIcon from '../../assets/icons/TractorIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: theme.card.list.maxHeight,
  },
  cardFullHeight: {
    height: '100%',
  },
  spinner: {
    marginTop: theme.card.spinner.marginTop,
  },
}));

const DisplayMachines = (props) => {
  const { machines, handleSelect, subOptimal, isLoading } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = (e, id) => {
    e.preventDefault();
    history.push(`/machines/${id}`);
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Maquinaria Candidata
          </Typography>
        }
      />
      <CardContent>
        {isLoading || !machines.length ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <>
            {subOptimal ? (
              <ListItemText secondary="No están disponibles las máquinas deseadas." />
            ) : null}
            <List className={classes.root}>
              {machines.map((machine) => (
                <Grid key={`grid-machine-${machine.id}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <TractorIcon
                          onClick={(e) => handleRedirect(e, machine.id)}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${machine.subtype_name} #${machine.id}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {machine.model_name}
                          </Typography>
                          {` — ${machine.brand_name} - ${machine.year}`}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => handleRedirect(e, machine.id)}
                      >
                        <SearchRoundedIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => handleSelect(e, machine)}
                      >
                        <AddCircleOutlineRoundedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" />
                </Grid>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayMachines;
