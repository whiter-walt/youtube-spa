import * as types from "./actionTypes";
import { youTube } from "../api/youtube";
import { logIn } from "../auth/auth";
import { store } from "..";
import { initialStateAuth } from "../reducers/authReducer";
import { initialStateFavs } from "../reducers/favsReducer";
import { initialStateVideos } from "../reducers/searchReducer";

export const getUserAPI = (email, password, returnSecureToken = true) => {
  const postData = {
    email,
    password,
    returnSecureToken,
  };
  return (dispatch) => {
    logIn
      .post("/", postData)
      .then((res) => {
        dispatch(saveUserData(res.data));
        localStorage.setItem(
          "current user",
          JSON.stringify(store.getState().authReducer)
        );
      })
      .catch((error) => {
        dispatch(userLogInError(error.response.data.error.message));
      });
  };
};

export const saveUserData = (data) => {
  return { type: types.USER_LOG_IN, payload: data };
};

export const userLogOut = () => {
  localStorage.removeItem("current user");
  return {
    type: types.USER_LOG_OUT,
    payload: { initialStateAuth, initialStateFavs, initialStateVideos },
  };
};

export const userLogInError = (error) => {
  return {
    type: types.USER_LOG_IN_ERROR,
    payload: formatUserLogInError(error),
  };
};

export const formatUserLogInError = (error) => {
  switch (error) {
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
      return "Invalid email or password";
    default:
      return "User is disabled";
  }
};
// VIDEOS =>
export const getAPI = (searchQuery, maxResults = 12, sort = "relevance") => {
  return (dispatch) => {
    youTube
      .get("/", {
        params: { q: searchQuery, maxResults, sort },
      })
      .then((res) => dispatch(getVideosOnQuery(res.data.items, searchQuery)))
      .catch((e) => {
        dispatch(getVideosError("An error occured"));
      });
  };
};

export const getVideosOnQuery = (videos, searchQuery) => {
  return {
    type: types.GET_VIDEOS_ON_QUERY,
    payload: { videos, searchQuery },
  };
};

export const getVideosError = (error) => {
  return {
    type: types.GET_VIDEOS_ERROR,
    payload: error,
  };
};

export const synchronizeVideos = (currentUser) => {
  return {
    type: types.SYNCH_VIDEOS,
    payload: JSON.parse(localStorage.getItem(`${currentUser}-videos`)),
  };
};

// FAVS =>
export const addSearchQueryToFavs = (
  searchQuery,
  searchTitle = searchQuery,
  sortResults = "relevance",
  maxResults = 12
) => {
  return {
    type: types.ADD_SEARCH_QUERY_TO_FAVS,
    payload: { searchQuery, searchTitle, sortResults, maxResults },
  };
};

export const editFav = (
  id,
  searchTitle,
  sortResults,
  maxResults,
  editFavValue
) => {
  return {
    type: types.EDIT_FAV,
    payload: { id, searchTitle, sortResults, maxResults, editFavValue },
  };
};

export const deleteFav = (id) => {
  return {
    type: types.DELETE_FAV,
    payload: id,
  };
};

export const synchronizeFavs = (currentUser) => {
  return {
    type: types.SYNCH_FAVS,
    payload: JSON.parse(localStorage.getItem(`${currentUser}-favs`)).favs,
  };
};
