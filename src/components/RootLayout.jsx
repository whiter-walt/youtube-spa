import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import MainMenu from "./MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { synchronizeFavs, synchronizeVideos } from "../actions/actions";
import { store } from "..";
const { Footer, Content } = Layout;

export const RootLayout = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer.auth.email);
  useEffect(() => {
    if (localStorage.getItem(`${currentUser}-favs`))
      dispatch(synchronizeFavs(currentUser));
    if (localStorage.getItem(`${currentUser}-videos`))
      dispatch(synchronizeVideos(currentUser));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  store.subscribe(() => {
    if (store.getState().searchReducer.foundVideos.length) {
      localStorage.setItem(
        `${currentUser}-videos`,
        JSON.stringify(store.getState().searchReducer)
      );
    }
    if (store.getState().favsReducer.favs.length) {
      localStorage.setItem(
        `${currentUser}-favs`,
        JSON.stringify(store.getState().favsReducer)
      );
    }
  });

  return (
    <Layout>
      <MainMenu />
      <Content>
        <Outlet />
      </Content>
      <Footer>{new Date().getFullYear()}</Footer>
    </Layout>
  );
};
