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
  error: {
    status: null,
    errorID: null,
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
        error: {
          status: action.payload.status,
          errorID: action.payload.id,
        },
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        userJWT: action.payload.data.jwt,
        userID: action.payload.data.user.id,
        isSubmitting: false,
        isLoading: true,
      };
    case LOGOUT:
      return {
        userJWT: null,
        userID: null,
        isLoading: true,
        isSubmitting: false,
        error: {
          status: null,
          errorID: null,
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
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data,
        ],
        isSubmitting: false,
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        isSubmitting: false,
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
      };
    case REMOVE_ITEM_FAILURE:
      return {
        ...state,
        error: {
          status: action.payload.status,
          errorID: action.payload.id,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
