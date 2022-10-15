import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button, Typography, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "..";
import { getAPI } from "../actions/actions";
import { FavEditorWindow } from "./FavEditorWindow";
const { Title } = Typography;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.searchReducer.query);
  const currentUser = useSelector((state) => state.authReducer.auth.email);

  const searchHandler = () => {
    if (searchQuery) {
      dispatch(getAPI(searchQuery));
      setSearchQuery("");
      localStorage[`${currentUser}-videos`] = JSON.stringify(
        store.getState().searchReducer
      );
    }
  };

  const showModal = () => {
    query && setIsModalOpen(true);
  };

  return (
    <>
      <Title>Youtube Search</Title>
      <div className="ant-input-group-wrapper">
        <Input
          className="search-form"
          size="large"
          placeholder="Enter query"
          value={searchQuery}
          addonAfter={
            <Tooltip title="Save query to favs">
              <HeartOutlined className="icon-save" onClick={showModal} />
            </Tooltip>
          }
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={searchHandler}
        />
        <Button
          className="search-button"
          type="primary"
          size="large"
          onClick={searchHandler}
        >
          <SearchOutlined className="icon-search" />
        </Button>
      </div>
      <FavEditorWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newFav={query}
      />
    </>
  );
};
export default SearchBar;
