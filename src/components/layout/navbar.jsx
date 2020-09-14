import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  deleteToken,
  deleteEmail,
  deleteType,
  logOut,
} from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: '40px',
  },
  logoButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const userMenuOpen = Boolean(userAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleUserMenuClose();
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const redirectMenu = (event, index) => {
    handleMenuClose();
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('/users-web');
        break;
      case 3:
        history.push('/chats');
        break;
      case 4:
        history.push('/types');
        break;
      case 5:
        history.push('/orders');
        break;
      case 6:
        history.push('/carriers');
        break;
      case 7:
        history.push('/machines');
        break;
      case 8:
        history.push('/serviceProviders');
        break;
      case 9:
        history.push('/users-mobile');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  const redirectUserMenu = (event, index) => {
    handleUserMenuClose();
    switch (index) {
      case 1:
        history.push('/');
        break;
      case 2:
        history.push('/login');
        break;
      case 3:
        history.push('/users-web');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('unkown index', event, index);
    }
  };

  const userMenuId = 'account-menu';

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userInformation);

  const handleLogOut = (e) => {
    dispatch(logOut());
    dispatch(deleteToken());
    dispatch(deleteEmail());
    dispatch(deleteType());
    redirectUserMenu(e, 1);
  };

  const renderUserMenu = (
    <Menu
      anchorEl={userAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={userMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={userMenuOpen}
      onClose={handleUserMenuClose}
    >
      <MenuItem>{currentUser.email}</MenuItem>
      <MenuItem onClick={(event) => handleLogOut(event)}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'drop-down-menu';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={(e) => redirectMenu(e, 5)}>Pedidos</MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 7)}>Maquinaria</MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 4)}>Tipos</MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 6)}>Transportistas</MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 8)}>
        Prestadores de Servicios
      </MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 3)}>Chats</MenuItem>
      <MenuItem onClick={(e) => redirectMenu(e, 9)}>Usuarios</MenuItem>
      {currentUser.role === 'admin' ? (
        <MenuItem onClick={(e) => redirectMenu(e, 2)}>Administradores</MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <button
            type="button"
            className={classes.logoButton}
            onClick={(event) => redirectMenu(event, 1)}
          >
            <img
              src="https://agromatch.cl/img/AgroMatch.svg"
              alt="logo"
              className={classes.logo}
            />
          </button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem onClick={(event) => redirectMenu(event, 5)}>
              Pedidos
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 7)}>
              Maquinaria
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 4)}>
              Tipos
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 6)}>
              Transportistas
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 8)}>
              Prestadores de Servicios
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 3)}>
              Chats
            </MenuItem>
            <MenuItem onClick={(event) => redirectMenu(event, 9)}>
              Usuarios
            </MenuItem>
            {currentUser.role === 'admin' ? (
              <MenuItem onClick={(event) => redirectMenu(event, 2)}>
                Administradores
              </MenuItem>
            ) : null}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-user"
              aria-haspopup="true"
              onClick={handleUserMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderUserMenu}
    </div>
  );
};

export default Navbar;
