const initialState = {
  email: '',
  role: '',
  token: '',
  isLogged: false,
  lastPage: '',
};

const userInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMAIL': {
      const { email } = action.payload;
      return {
        ...state,
        email,
      };
    }
    case 'DELETE_EMAIL': {
      return {
        ...state,
        email: '',
      };
    }
    case 'ADD_TOKEN': {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    case 'DELETE_TOKEN': {
      return {
        ...state,
        token: '',
      };
    }
    case 'ADD_TYPE': {
      const { role } = action.payload;
      return {
        ...state,
        role,
      };
    }
    case 'DELETE_TYPE': {
      return {
        ...state,
        role: '',
      };
    }
    case 'SIGN_IN': {
      return {
        ...state,
        isLogged: true,
      };
    }
    case 'LOG_OUT': {
      return {
        ...state,
        isLogged: false,
      };
    }
    case 'CHANGE_LAST_PAGE': {
      const { lastPage } = action.payload;
      return {
        ...state,
        lastPage,
      };
    }
    default:
      return state;
  }
};

export default userInformationReducer;
