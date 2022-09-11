import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../actions/actions";

const MainMenu = () => {
  const dispatch = useDispatch();
  const items = [
    { label: <NavLink to="/">Search</NavLink>, key: "search" },
    { label: <NavLink to="favourites">Favourites</NavLink>, key: "favs" },
    {
      label: (
        <NavLink to="/" onClick={() => dispatch(userLogOut())}>
          Log Out
        </NavLink>
      ),
      key: "logoff",
    },
  ];

  return <Menu mode="horizontal" items={items} />;
};
export default MainMenu;
