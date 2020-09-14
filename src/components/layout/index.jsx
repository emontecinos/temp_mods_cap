import React from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar';
import Login from '../login';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '30px',
    marginBottom: '30px',
  },
}));

const Layout = (props) => {
  const { children } = props;
  const currentUser = useSelector((state) => state.userInformation);
  const classes = useStyles();

  return (
    <>
      {currentUser.token ? (
        <>
          <Navbar />
          <CssBaseline />
          <Container className={classes.container}>{children}</Container>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Layout;
