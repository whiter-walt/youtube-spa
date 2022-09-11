import { List, Typography } from "antd";
import { useSelector } from "react-redux";
import { FavItem } from "./FavItem";

const { Title } = Typography;

export const FavList = () => {
  const favs = useSelector((state) => state.favsReducer.favs);

  return (
    <>
      <Title>Favourites</Title>
      <List
        size="large"
        bordered
        dataSource={favs}
        renderItem={(fav) => <FavItem key={fav.id} favItem={fav} />}
      />
    </>
  );
};
