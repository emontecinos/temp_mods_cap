import React from 'react';
import { useHistory } from 'react-router-dom';

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
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

const DisplayCarriers = (props) => {
  const { carriers, handleSelect, titulo, isLoading } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = (e, id) => {
    e.preventDefault();
    history.push(`/carriers/${id}`);
  };

  return (
    <Card className={classes.cardFullHeight}>
      <CardHeader
        title={
          <Typography color="textPrimary" variant="h6">
            Transportistas Candidatos {titulo}
          </Typography>
        }
      />
      <CardContent>
        {isLoading || carriers.length === 0 ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.spinner} />
            </Grid>
          </Grid>
        ) : (
          <List className={classes.root}>
            {carriers.map((carrier) => (
              <Grid key={`grid-carrier-${carrier.id}`}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <Tooltip title="Transportista">
                        {titulo === 'Ida' ? (
                          <ArrowForwardIcon
                            onClick={(e) => handleRedirect(e, carrier.id)}
                          />
                        ) : (
                          <ArrowBackIcon
                            onClick={(e) => handleRedirect(e, carrier.id)}
                          />
                        )}
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={carrier.name}
                    secondary={carrier.carries}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => handleRedirect(e, carrier.id)}
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => handleSelect(e, carrier)}
                    >
                      <AddCircleOutlineRoundedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" />
              </Grid>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayCarriers;
