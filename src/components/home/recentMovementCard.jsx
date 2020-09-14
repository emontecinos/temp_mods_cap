import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const RecentMovementCard = (props) => {
  const { order } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/rent/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => handleLink(order.id)}>
        <CardContent>
          <Typography variant="h5">Arriendo {order.id}</Typography>
          <Typography variant="body2" component="p">
            <b>Estado:</b> {order.state}
          </Typography>
          <Typography variant="body2" component="p">
            <b>Inicio:</b> {Moment.utc(order.start_date).format('LL')}
          </Typography>
          <Typography variant="body2" component="p">
            <b>Fin:</b> {Moment.utc(order.end_date).format('LL')}
          </Typography>
          <Typography variant="body2" component="p">
            <b>Usuario:</b> {order.user_id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecentMovementCard;
