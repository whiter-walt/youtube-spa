import {
  GET_VIDEOS_ERROR,
  GET_VIDEOS_ON_QUERY,
  SYNCH_VIDEOS,
} from "../actions/actionTypes";

export const initialStateVideos = {
  foundVideos: [],
  query: "",
  errorMessage: "",
};

export const searchReducer = (state = initialStateVideos, action) => {
  switch (action.type) {
    case GET_VIDEOS_ON_QUERY:
      return {
        ...state,
        foundVideos: [...action.payload.videos],
        query: action.payload.searchQuery,
        errorMessage: "",
      };
    case GET_VIDEOS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SYNCH_VIDEOS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
