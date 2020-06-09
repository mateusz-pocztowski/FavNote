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
  id,
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
          id,
          password,
        },
      );
      dispatch({ type: AUTH_SUCCESS, payload });
    } else if (authType === 'login') {
      const payload = await axios.post(`http://localhost:1337/auth/local`, {
        identifier: id || email,
        password,
      });
      dispatch({ type: AUTH_SUCCESS, payload });
    }
  } catch (err) {
    const {
      data: { data },
      status,
    } = err.response;
    const [{ messages }] = data;
    const [{ message }] = messages;
    dispatch({ type: AUTH_FAILURE, payload: { message, status } });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      userJWT: null,
      userID: null,
    },
  };
};

export const fetchItems = itemType => async (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST });
  if (!getState().userJWT) return;
  try {
    const { data } = await axios.get(
      `http://localhost:1337/${itemType}?user.id=${getState().userID}`,
      {
        headers: {
          Authorization: `Bearer ${getState().userJWT}`,
        },
      },
    );
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data,
        itemType,
      },
    });
  } catch (err) {
    const { status } = err.response;
    dispatch({ type: REMOVE_ITEM_FAILURE, payload: { status } });
  }
};

export const removeItem = (itemType, id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM_REQUEST });
  try {
    axios.delete(
      `http://localhost:1337/${itemType}/${id}?user.id=${getState().userID}`,
      {
        headers: {
          Authorization: `Bearer ${getState().userJWT}`,
        },
      },
    );
    dispatch({
      type: REMOVE_ITEM_SUCCESS,
      payload: {
        status: 200,
        content: `Selected item has been successfully removed!`,
        itemType,
        id,
      },
    });
  } catch (err) {
    const { status } = err.response;
    dispatch({ type: REMOVE_ITEM_FAILURE, payload: { status } });
  }
};

export const addItem = (itemType, itemContent) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: ADD_ITEM_REQUEST });
  try {
    const { data, status } = await axios.post(
      `http://localhost:1337/${itemType}?user.id=${getState().userID}`,
      {
        ...itemContent,
        user: getState().userID,
        headers: {
          Authorization: `Bearer ${getState().userJWT}`,
        },
      },
    );
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: {
        status,
        content: `New item has been successfully added!`,
        itemType,
        data,
      },
    });
  } catch (err) {
    const { status } = err.response;
    dispatch({ type: ADD_ITEM_FAILURE, payload: { status } });
  }
};
