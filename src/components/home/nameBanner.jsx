import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  logo: {
    width: '100%',
    padding: '0 60px',
  },
});

const NameBanner = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <img
        src="https://agromatch.cl/img/AgroMatch.svg"
        alt="logo"
        className={classes.logo}
      />
    </Grid>
  );
};

export default NameBanner;
