import { Row, Col, List } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { VideoItemCard } from "./VideoItemCard";
import { VideoItemList } from "./VideoItemList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { ErrorAlert } from "./ErrorAlert";

export const VideosArea = () => {
  const [toggleView, setToggleView] = useState(false);
  const {
    foundVideos: videos,
    query: lastQuery,
    errorMessage
  } = useSelector((state) => state.searchReducer);

  return (
    <>
      {lastQuery && (
        <div className="search-info">{`Видео по запросу: "${lastQuery}"`}</div>
      )}

      {!!videos.length && (
        <div className="toggle-view">
          <BarsOutlined onClick={() => setToggleView(false)} />
          <AppstoreOutlined onClick={() => setToggleView(true)} />
        </div>
      )}
      {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
      {toggleView ? (
        <Row justify="start">
          {videos.map((i) => (
            <Col span={6} key={uuidv4()}>
              <VideoItemCard id={i.id} snippet={i.snippet} />
            </Col>
          ))}
        </Row>
      ) : (
        <List
          itemLayout="vertical"
          size="small"
          dataSource={videos}
          renderItem={(i) => (
            <VideoItemList key={uuidv4()} id={i.id} snippet={i.snippet} />
          )}
        />
      )}
    </>
  );
};
