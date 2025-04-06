import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";
import { useSelector } from "react-redux";
import formatNumber from "../utils/formatNumber";
import { toast } from "react-toastify";
import axios from "axios";

const ChannelVideo = ({ triggerVideoFetching, item, channelData }) => {
  const user = useSelector((store) => store.user.userDetails);
  const token = useSelector((store) => store.user.token);
  const [op, setOp] = useState(false);
  const navigate = useNavigate();

  // delete video function
  const handleDelete = async (videoId) => {
    try {
      const result = await axios.delete(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/deleteVideo/${videoId}/${channelData?._id}/${user?._id}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (result) {
        toast.success("video deleted successfully");
        triggerVideoFetching();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setOp(false);
    }
  };

  return (
    <div className="video_card w-96 sm:w-80 " key={item._id}>
      <Link to={`/video/${item._id}`}>
        <img
          src={item.thumbnailUrl}
          alt={item.title.slice(0, 10) + "..."}
          className="box  w-96  xs:h-52 border border-black"
        />
      </Link>
      <div className="flex items-start  justify-between gap-2 ps-2">
        <div className="description">
          <h2>
            {item?.title?.length > 72
              ? item?.title.slice(0, 72) + "..."
              : item?.title}
          </h2>
          <p>
            {formatNumber(item?.views)} views . {timeAgo(item?.createdAt)}
          </p>
        </div>
        <div className="op py-2 relative">
          {/* check if video belongs to user */}
          {user?._id === channelData?.owner ? (
            <>
              <HiOutlineDotsVertical
                onClick={() => setOp(!op)}
                className="cursor-pointer"
              />
              <ul
                className={`${
                  op ? "block" : "hidden"
                } absolute bg-gray-200 rounded-md shadow-md top-7 right-2`}
              >
                <li
                  onClick={() => {
                    setOp(false);
                    navigate(`/updateVideo/${item._id}`);
                  }}
                  className="p-1 flex gap-1 items-center  px-4 cursor-pointer hover:bg-gray-100 w-full"
                >
                  <CiEdit />
                  Edit
                </li>

                <li
                  onClick={() => handleDelete(item._id)}
                  className="p-1 flex gap-1 items-center px-4 cursor-pointer hover:bg-gray-100 w-full"
                >
                  <MdDeleteOutline />
                  Delete
                </li>
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideo;
