import { List } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, EditFilled, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FavEditorWindow } from "../components/FavEditorWindow";
import { deleteFav, getAPI } from "../actions/actions";

export const FavItem = ({ favItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const reroute = useNavigate();
  const { id, fav, title, maxRes, sort } = favItem;
  const searchHandler = () => {
    dispatch(getAPI(fav, maxRes, sort));
    reroute("/");
  };

  return (
    <>
      <List.Item>
        <div>{`${fav} ~ ${title}`}</div>
        <div>
          <DeleteFilled
            className="icon icon-delete"
            onClick={() => dispatch(deleteFav(id))}
          />
          <EditFilled
            className="icon icon-edit"
            onClick={() => setIsModalOpen(true)}
          />
          <SearchOutlined
            className="icon icon-search fav-search"
            onClick={searchHandler}
          />
        </div>
      </List.Item>
      <FavEditorWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isQueryEditable={true}
        favItem={favItem}
      />
    </>
  );
};
