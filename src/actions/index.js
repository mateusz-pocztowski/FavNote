import axios from 'axios';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const LOGOUT = 'LOGOUT';

export const authenticate = (
  email,
  username,
  password,
  authType,
) => async dispatch => {
  dispatch({ type: AUTH_REQUEST });

  try {
    if (authType === 'register') {
      const payload = await axios.post(
        `http://localhost:1337/auth/local/register`,
        {
          email,
          username,
          password,
        },
      );
      dispatch({ type: AUTH_SUCCESS, payload });
    } else if (authType === 'login') {
      const payload = await axios.post(`http://localhost:1337/auth/local`, {
        identifier: username || email,
        password,
      });
      dispatch({ type: AUTH_SUCCESS, payload });
    }
  } catch (err) {
    dispatch({ type: AUTH_FAILURE, err });
  }
};

export const fetchItems = itemType => async dispatch => {
  dispatch({ type: FETCH_REQUEST });

  try {
    const { data } = await axios.get(`http://localhost:1337/${itemType}/`);
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data,
        itemType,
      },
    });
  } catch (err) {
    dispatch({ type: FETCH_FAILURE, err });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      userID: null,
    },
  };
};

export const removeItem = (itemType, id) => dispatch => {
  dispatch({ type: REMOVE_ITEM_REQUEST });

  axios
    .delete(`http://localhost:1337/${itemType}/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
        },
      });
    })
    .catch(err => {
      dispatch({ type: REMOVE_ITEM_FAILURE, err });
    });
};

export const addItem = (itemType, itemContent) => async dispatch => {
  dispatch({ type: ADD_ITEM_REQUEST });
  try {
    const { data } = await axios.post(`http://localhost:1337/${itemType}`, {
      ...itemContent,
    });
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: {
        itemType,
        data,
      },
    });
  } catch (err) {
    dispatch({ type: ADD_ITEM_FAILURE, err });
  }
};
