import SearchBar from "./components/SearchBar";
import { VideosArea } from "./components/VideosArea";
import { FavList } from "./components/FavsList";
import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { Auth } from "./components/Auth";
import { store } from ".";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("current user")
  );
  store.subscribe(() => {
    store.getState().authReducer.auth.email
      ? setIsLogged(true)
      : setIsLogged(false);
  });

  return (
    <Routes>
      <Route path="/" element={isLogged ? <RootLayout /> : <Auth />}>
        <Route
          index
          element={
            <>
              <SearchBar />
              <VideosArea />
            </>
          }
        />
        <Route path="favourites" element={<FavList />} />
      </Route>
    </Routes>
  );
}

export default App;
