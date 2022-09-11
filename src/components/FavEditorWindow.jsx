import { Modal, Input, Form, Select, InputNumber } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchQueryToFavs, editFav } from "../actions/actions";

const { Option } = Select;
export const FavEditorWindow = ({
  isModalOpen,
  setIsModalOpen,
  isQueryEditable,
  id,
  fav,
  title,
  maxRes,
  sort,
}) => {
  const [editFavValue, setEditFavValue] = useState(fav);
  const [searchTitle, setSearchTitle] = useState(title);
  const [sortResults, setSortResults] = useState(sort);
  const [maxResults, setMaxResults] = useState(maxRes);
  const dispatch = useDispatch();

  const saveFavHandler = () => {
    dispatch(addSearchQueryToFavs(fav, searchTitle, sortResults, maxResults));
    setSearchTitle("");
    setIsModalOpen(false);
  };

  const editFavHandler = () => {
    dispatch(editFav(id, searchTitle, sortResults, maxResults, editFavValue));
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Save Query To Favs"
      visible={isModalOpen}
      maskClosable
      okText="Save"
      onCancel={() => setIsModalOpen(false)}
      onOk={isQueryEditable ? editFavHandler : saveFavHandler}
    >
      <Form>
        <Form.Item label="Query">
          <Input
            value={editFavValue}
            disabled={!isQueryEditable}
            onChange={(e) => setEditFavValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item required label="Title">
          <Input
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Sorting">
          <Input.Group>
            <Select
              style={{ width: "50%" }}
              defaultValue="relevance"
              value={sortResults}
              onChange={(val) => setSortResults(val)}
            >
              <Option value="date">Date</Option>
              <Option value="rating">Rating</Option>
              <Option value="relevance">Relevance</Option>
              <Option value="title">Title</Option>
              <Option value="videoCount">Video Count</Option>
              <Option value="viewCount">View Count</Option>
            </Select>
          </Input.Group>
        </Form.Item>
        <Form.Item label="Max results">
          <Input
            type={"range"}
            min={1}
            max={50}
            defaultValue={25}
            value={maxResults}
            onChange={(e) => {
              setMaxResults(e.target.value);
            }}
          />
          <InputNumber
            min={1}
            max={50}
            defaultValue={25}
            value={maxResults}
            onChange={(num) => setMaxResults(num)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
