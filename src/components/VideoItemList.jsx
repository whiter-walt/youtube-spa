import { List, Typography } from "antd";
const { Link } = Typography;

export const VideoItemList = ({ id, snippet }) => {
  const { videoId } = id;
  const { channelTitle, description, thumbnails, title } = snippet;

  return (
    <List.Item
      extra={<img width={250} alt={title} src={thumbnails.medium.url} />}
    >
      <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
        <List.Item.Meta
          title={`${title} / ${channelTitle}`}
          description={description}
        />
      </Link>
    </List.Item>
  );
};
