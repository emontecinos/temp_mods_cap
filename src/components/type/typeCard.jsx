import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import DisplayTable from '../subtypes/displaySubtypes';
import TypeDetails from './typeDetails';
import RegisterSubtype from '../subtypes/subtypeRegister';
import EditSubtype from '../subtypes/subtypeEdit';
import EditType from './typeEdit';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '25 25 25 25',
    backgroundColor: theme.palette.common.grey,
    width: '100%',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
}));

const TypeCard = (props) => {
  const {
    data,
    editState,
    setEditState,
    handleEdit,
    idType,
    isLoading,
  } = props;
  const classes = useStyles();
  const [idSubtype, setIdSubtype] = useState(0);

  return (
    <Grid item container p={10} m={10}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h4">{data.name}</Typography>}
          subheader={
            <Typography variant="h6">Tipo de Maquinaria #{data.id}</Typography>
          }
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid container spacing={2} justify="flex-end">
            {editState ? (
              <Grid item xs={6}>
                <EditType setEditState={setEditState} idType={idType} />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <TypeDetails
                  data={data}
                  handleEdit={handleEdit}
                  isLoading={isLoading}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <RegisterSubtype idType={data.id} />
            </Grid>
            <Grid item xs={12}>
              <DisplayTable setIdSubtype={setIdSubtype} idType={idType} />
            </Grid>
            {idSubtype > 0 ? (
              <Grid item xs={12}>
                <EditSubtype
                  idSubtype={idSubtype}
                  setIdSubtype={setIdSubtype}
                />
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TypeCard;
