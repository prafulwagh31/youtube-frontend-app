import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import Comment from "./Comment";
import timeAgo from "../utils/timeAgo";
import formatNumber from "../utils/formatNumber";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setcomment] = useState("");
  const [commentTrigger, setCommentTrigger] = useState(false);
  const user = useSelector((store) => store.user.userDetails);
  const token = useSelector((store) => store.user.token);

  useEffect(() => {
    // fetch video
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-backend-pjh2.onrender.com/youtube/getVideoId/${video}`
      );
      if (data) {
        setVideoData(data);
        fetchChannelData(data.channelId);
        fetchChannelVideos(data.channelId);
      }
      if (data?.videoUrl) {
        const url = new URL(data.videoUrl);
        const videoId =
          url.searchParams.get("v") || url.pathname.split("/").pop();
        setVideoUrl(videoId);
      }
    };
    fetchData();
  }, [params]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/youtube/getVideoId/${video}`
  //     );

  //     if (data?.videoUrl) {
  //       const url = new URL(data.videoUrl);
  //       const videoId =
  //         url.searchParams.get("v") || url.pathname.split("/").pop();
  //       setVideoUrl(videoId);
  //     }
  //   };
  //   fetchData();
  // }, [params]);

  useEffect(() => {
    if (videoData) {
      fetchVideoComments();
    }
  }, [videoData, commentTrigger]);

  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `https://youtube-backend-pjh2.onrender.com/youtube/getChannelId/${cId}`
    );
    if (data) {
      setChannelData(data);
    }
  };

  const fetchChannelVideos = async (id) => {
    try {
      const { data } = await axios.get(
        `https://youtube-backend-pjh2.onrender.com/youtube/getChannelVideos/${id}`
      );

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `https://youtube-backend-pjh2.onrender.com/youtube/singleVideoComment/${video}`
    );

    if (data) {
      setComments(data.comments);
    }
  };

  const triggerCommentFetch = () => {
    setCommentTrigger(!commentTrigger);
  };

  // function to add comment
  const handleComment = async () => {
    if (comment == "") {
      return toast.error("Comment cannot be empty!");
    }
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login required");
    }

    const commentData = {
      videoId: videoData?._id,
      userId: user?.id,
      description: comment,
    };

    try {
      const data = await axios.post(
        "https://youtube-backend-pjh2.onrender.com/youtube/addComment/",
        commentData
      );
      if (data) {
        toast.success("Comment Added Successfully");
        fetchVideoComments();
        setcomment("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col   mlg:flex-row ">
      <div className="  mlg:w-[60rem]   ">
        <iframe
          className=" w-full h-[30vh] xs:h-[50vh] md:h-[28rem] "
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          rel="0"
          autoPlay="1"
          allowFullScreen
        ></iframe>
        <div className="operations flex flex-col sm:flex-row gap-2 justify-between   py-4 items-center">
          <div className="flex gap-2 pb-2 sm:pb-0 w-full items-center">
            <Link
              to={`/channel/${channelData?._id}`}
              className="flex items-center gap-2"
            >
              <img
                className="channel cursor-pointer w-12 h-12 rounded-full border border-black"
                src={channelData?.channelLogo}
                alt="Channel name"
              />
              <h2 className="font-bold cursor-pointer">
                {channelData?.channelName}
              </h2>
            </Link>
            <button className="px-4 py-1 cursor-pointer bg-slate-800 transition-all hover:bg-black text-white   rounded-full">
              Subscribe
            </button>
          </div>
          <div className="flex text-[14px] sm:text-[16px] w-full gap-2 items-center  sm:justify-end">
            <button className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2">
              <BiLike />
            </button>
            <button className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2">
              <BiDislike />
            </button>
          </div>
        </div>

        <div className="comments py-2 bg-slate-100 p-2">
          <div className="flex gap-2 py-2">
            <h2>{formatNumber(videoData?.views)} Views •</h2>
            <h2>{timeAgo(videoData?.createdAt)}</h2>
          </div>
          <p className="text-[14px] sm:text-[16px]">
            {" "}
            {videoData?.description}
          </p>
        </div>

        <div className="addComment flex flex-col items-end">
          <input
            type="text"
            name="comment"
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
            placeholder="comment here"
            className=" outline-none w-full border-b-2 border-black my-2 p-2 text-[14px] sm:text-[16px]"
          />
          <button
            onClick={handleComment}
            className="  bg-white text-[14px] sm:text-[16px] w-36 p-1 border border-black hover:bg-black hover:text-white transition-all"
          >
            Comment
          </button>
        </div>

        <div className="comments py-4 flex flex-col gap-4">
          {comments && comments?.length >= 1
            ? comments?.map((item) => (
                <Comment
                  triggerCommentFetch={triggerCommentFetch}
                  video={item.videoId}
                  key={item._id}
                  id={item._id}
                  createdAt={item.createdAt}
                  owner={item.userId}
                  description={item.description}
                />
              ))
            : "No comments to display"}
        </div>
      </div>
      <div className="sideView px-4 mlg:w-[40rem]    ">
        <h2 className="text-xl py-4">Channel related videos</h2>
        <div className="flex flex-col gap-4">
          {channelVideos && channelVideos.length >= 1
            ? channelVideos.map((item) => (
                <Link
                  key={item._id}
                  to={`/video/${item._id}`}
                  className="boxVideo flex items-center sm:items-start gap-2  shadow-md rounded-md p-2"
                >
                  <img
                    className="w-16  h-14   sm:h-auto sm:w-44 rounded-md"
                    src={item?.thumbnailUrl}
                    alt="video img"
                  />
                  <div className="details">
                    <h2 className="text-[14px] sm:text-[16px]">
                      {item?.title.length > 55
                        ? item?.title?.slice(0, 55) + "..."
                        : item?.title}
                    </h2>
                    <h2 className="text-[14px] sm:text-[16px]">
                      {channelData?.channelName}
                    </h2>
                    <h2 className="text-[14px] sm:text-[16px]">
                      {formatNumber(item?.views)} • {timeAgo(item?.createdAt)}{" "}
                    </h2>
                  </div>
                </Link>
              ))
            : "No videos related to channel"}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
