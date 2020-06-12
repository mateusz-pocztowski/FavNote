import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT,
  HIDE_LOADER,
  FETCH_SUCCESS,
  FETCH_REQUEST,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
} from 'actions';

export const initialState = {
  userJWT: null,
  userID: null,
  isLoading: false,
  isSubmitting: false,
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
        isSubmitting: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isSubmitting: false,
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
        isSubmitting: false,
      };
    case LOGOUT:
      return {
        userJWT: null,
        userID: null,
        isLoading: true,
        isSubmitting: false,
        message: {
          status: null,
          content: null,
        },
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        isSubmitting: true,
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
        isSubmitting: false,
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        message: {
          status: action.payload.status,
          content: action.payload.content,
          isSubmitting: false,
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
