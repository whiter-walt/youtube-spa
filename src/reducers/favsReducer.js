import {
  ADD_SEARCH_QUERY_TO_FAVS,
  DELETE_FAV,
  EDIT_FAV,
  SYNCH_FAVS,
} from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";

export const initialStateFavs = { favs: [] };

export const favsReducer = (state = initialStateFavs, action) => {
  switch (action.type) {
    case ADD_SEARCH_QUERY_TO_FAVS:
      const newFav = {
        id: uuidv4(),
        fav: action.payload.searchQuery,
        title: action.payload.searchTitle,
        maxRes: action.payload.maxResults,
        sort: action.payload.sortResults,
      };
      return { ...state, favs: [newFav, ...state.favs] };
    case EDIT_FAV:
      const editedFav = state.favs.map((i) =>
        i.id === action.payload.id
          ? {
              ...i,
              fav: action.payload.editFavValue,
              title: action.payload.searchTitle,
              maxRes: action.payload.maxResults,
              sort: action.payload.sortResults,
            }
          : i
      );
      return { ...state, favs: editedFav };
    case SYNCH_FAVS:
      return { ...state, favs: action.payload };
    case DELETE_FAV:
      const removedFav = state.favs.filter((i) => i.id !== action.payload);
      return { ...state, favs: removedFav };
    default:
      return state;
  }
};
