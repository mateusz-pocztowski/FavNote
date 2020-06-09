import {
  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  AUTH_SUCCESS,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  LOGOUT,
  AUTH_FAILURE,
  ADD_ITEM_FAILURE,
  REMOVE_ITEM_FAILURE,
  AUTH_REQUEST,
  ADD_ITEM_REQUEST,
  REMOVE_ITEM_REQUEST,
} from 'actions';

const initialState = {
  userJWT: null,
  userID: null,
  message: {
    status: null,
    content: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        message: {
          status: action.payload.status,
          content: action.payload.content,
        },
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        userJWT: action.payload.data.jwt,
        userID: action.payload.data.user.id,
      };
    case LOGOUT:
      return {
        ...state,
        userJWT: action.payload.userJWT,
        userID: action.payload.id,
      };
    case FETCH_REQUEST:
      return {
        ...state,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case ADD_ITEM_REQUEST:
      return {
        ...state,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        message: {
          status: action.payload.status,
          content: action.payload.content,
        },
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data,
        ],
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        message: {
          status: action.payload.status,
          content: action.payload.content,
        },
      };
    case REMOVE_ITEM_REQUEST:
      return {
        ...state,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(
            item => item.id !== action.payload.id,
          ),
        ],
        message: {
          status: action.payload.status,
          content: action.payload.content,
        },
      };
    case REMOVE_ITEM_FAILURE:
      return {
        ...state,
        message: {
          status: action.payload.status,
          content: action.payload.content,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
