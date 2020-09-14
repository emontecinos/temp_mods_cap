export const addToken = (content) => ({
  type: 'ADD_TOKEN',
  payload: {
    token: content,
  },
});

export const deleteToken = () => ({
  type: 'DELETE_TOKEN',
});

export const signIn = () => ({
  type: 'SIGN_IN',
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const addEmail = (content) => ({
  type: 'ADD_EMAIL',
  payload: {
    email: content,
  },
});

export const deleteEmail = () => ({
  type: 'DELETE_EMAIL',
});

export const addType = (content) => ({
  type: 'ADD_TYPE',
  payload: {
    role: content,
  },
});

export const deleteType = () => ({
  type: 'DELETE_TYPE',
});

export const changeLastPage = (content) => ({
  type: 'CHANGE_LAST_PAGE',
  payload: {
    lastPage: content,
  },
});
