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
} from 'actions';

const initialState = {
  userID: null,
  isLoading: false,
  message: {
    status: null,
    content: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
        userID: action.payload.data.jwt,
      };
    case LOGOUT:
      return {
        ...state,
        userID: action.payload.userID,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [...action.payload.data],
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
