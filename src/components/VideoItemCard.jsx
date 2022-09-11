import { Card, Typography } from "antd";
const { Link } = Typography;
const { Meta } = Card;

export const VideoItemCard = ({ id, snippet }) => {
  const { videoId } = id;
  const { channelTitle, description, thumbnails, title } = snippet;

  return (
    <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
      <Card
        className="video-item-card"
        hoverable
        cover={<img alt={title} src={thumbnails.medium.url} />}
      >
        <Meta title={`${title} / ${channelTitle}`} description={description} />
      </Card>
    </Link>
  );
};
