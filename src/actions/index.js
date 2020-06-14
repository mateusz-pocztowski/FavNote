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

export const HIDE_LOADER = 'HIDE_LOADER';
export const LOGOUT = 'LOGOUT';

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
    dispatch({ type: FETCH_FAILURE, payload: { status } });
  }
};

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
    dispatch(fetchItems('notes'));
    dispatch(fetchItems('twitters'));
    dispatch(fetchItems('articles'));
  } catch (err) {
    const { status, statusText } = err.response;
    if (status === 404)
      dispatch({
        type: AUTH_FAILURE,
        payload: { status, id: statusText },
      });
    else {
      const {
        data: { message: data },
      } = err.response;
      const [{ messages }] = data;
      const [{ id }] = messages;
      dispatch({
        type: AUTH_FAILURE,
        payload: { status, id },
      });
    }
  }
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: {
      isLoading: false,
    },
  };
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
    const { data } = await axios.post(
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
        itemType,
        data,
      },
    });
  } catch (err) {
    const { status } = err.response;
    dispatch({ type: ADD_ITEM_FAILURE, payload: { status } });
  }
};
