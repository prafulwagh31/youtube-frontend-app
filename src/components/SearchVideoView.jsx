import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatNumber from "../utils/formatNumber";
import timeAgo from "../utils/timeAgo";

const SearchVideoView = ({ item }) => {
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    // fetch channel with id
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-backend-pjh2.onrender.com/youtube/getChannelId/${item?.channelId}`
      );
      if (data) {
        setChannelData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <Link
      to={`/video/${item._id}`}
      className="border  rounded-md shadow-md flex-col sm:flex-row sm:flex p-4 gap-4 w-full   xl:w-[85%]"
    >
      <img
        className="sm:w-32 md:w-44 mlg:w-56  lg:w-96"
        src={item?.thumbnailUrl}
        alt="video thumbnail"
      />
      <div className="data flex gap-4 sm:gap-0 flex-row-reverse sm:flex-col">
        <div className="">
          <h2 className="font-semibold sm:text-[12px] md:text-xl">
            {item?.title}
          </h2>
          <p>
            {formatNumber(item?.views)} views . {timeAgo(item?.createdAt)}
          </p>
        </div>
        <div className="flex text-[12px] md:text-sm font-semibold  sm:py-1  md:py-2 gap-2 items-center">
          <img
            className="w-20 sm:w-5 md:w-10 sm:h-5 md:h-10 rounded-full  border border-black"
            src={channelData?.channelLogo}
            alt="channel logo"
          />
          <h2 className=" hidden sm:block ">{channelData?.channelName}</h2>
        </div>
        <p className="hidden sm:block  sm:text-[12px] md:text-sm ">
          {item?.description.length > 198
            ? item?.description.slice(0, 198) + "..."
            : item?.description}{" "}
        </p>
      </div>
    </Link>
  );
};

export default SearchVideoView;
