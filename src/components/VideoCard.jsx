import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

const VideoCard = ({ videoId, title, thumbnailUrl, channelId, createdAt }) => {
  const [channelData, setChannelData] = useState([]);
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-backend-pjh2.onrender.com/youtube/getChannelId/${channelId}`
      );
      if (data) {
        setChannelData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="video_card w-96  sm:w-80 mlg:w-96">
      <Link to={`/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="box w-96 xs:h-52 border border-black"
        />
      </Link>
      <div className="flex items-center gap-2 ps-2">
        <img
          className="channel w-12 h-12 rounded-full border border-black"
          src={channelData.channelLogo}
          alt="Channel name"
        />
        <div className="description text-[14px] xs:text-[16px]">
          <h2>{title?.length > 72 ? title.slice(0, 72) + "..." : title}</h2>
          <Link
            to={`/channel/${channelData?._id}`}
            className="channel_views text-sm text-gray-500"
          >
            <p className="text-[12px] xs:text-[14px]">
              {channelData?.channelName}
            </p>
            <div className="flex gap-2">
              <h2 className="text-[12px] xs:text-[14px]">1K Views</h2>
              <h2 className="text-[12px] xs:text-[14px]">
                {timeAgo(createdAt)}
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
