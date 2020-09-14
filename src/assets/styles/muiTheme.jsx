import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#eeeeee',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: 'rgba(177, 214, 111, 1)',
      main: '#6d8a3a',
      dark: '#6d8a3a',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgba(112, 143, 92, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: 'rgba(255, 118, 118, 1)',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    table: {
      error: {
        normal: 'rgba(255, 118, 118, 0.1)',
        selected: 'rgba(255, 118, 118, 0.15)',
      },
      finish: {
        normal: 'rgba(109, 138, 58, 0.1)',
        selected: 'rgba(109, 138, 58, 0.15)',
      },
      active: {
        normal: 'rgb(255, 255, 255)',
        selected: 'rgb(245, 245, 245)',
      },
    },
  },
  card: {
    list: {
      maxHeight: 165,
    },
    divWithActions: {
      height: 125,
    },
    spinner: {
      marginTop: 40,
    },
  },
  chat: {
    list: {
      maxHeight: '56vh',
    },
  },
});

export default theme;
