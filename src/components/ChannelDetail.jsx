import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";
import Loader from "./Loader";

const ChannelDetail = () => {
  const params = useParams();
  const [channelData, setChannelData] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const user = useSelector((store) => store.user.userDetails);
  const [triggerVideoFetch, setTriggerVideoFetch] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-pjh2.onrender.com/youtube/getChannelId/${params.id}`
        );
        if (data) {
          setChannelData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannelData();
  }, [params]);

  useEffect(() => {
    if (channelData) {
      fetchVideos(channelData?._id);
    }
  }, [channelData, triggerVideoFetch]);

  // trigger function to rerender the component
  const triggerVideoFetching = () => {
    setTriggerVideoFetch(!triggerVideoFetch);
  };

  // function to fetch videos
  const fetchVideos = async (channelId) => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `https://youtube-backend-pjh2.onrender.com/youtube/getChannelVideos/${channelId}`
      );

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:px-24">
          <div>
            {channelData && Object.keys(channelData).length >= 1 ? (
              <div>
                <img
                  src={channelData?.channelBanner}
                  className="rounded-md h-20 xs:h-auto"
                  alt="channelBanner"
                />
                <div className="channelDetails flex flex-col xs:flex-row xs:gap-4 sm:gap-8 py-4">
                  <img
                    src={channelData?.channelLogo}
                    className="rounded-full   xs:h-32  sm:h-[10rem] max-w-28 xs:max-w-32  sm:max-w-full  border-8"
                    alt="channellogo"
                  />
                  <div className="details">
                    <h2 className="text-3xl font-bold">
                      {channelData?.channelName}
                    </h2>
                    <p>Videos : {channelData?.videos?.length}</p>
                    <p>Created At : {channelData?.createdAt?.split("T")[0]}</p>
                    <p>
                      {channelData?.description?.length >= 330
                        ? channelData?.description.slice(0, 330) + "..."
                        : channelData?.description}
                    </p>
                  </div>
                </div>
                <div className="toggles">
                  <h2 className="py-4 bg-slate-100 text-center  xs:text-left xs:px-6 my-2 xs:my-4 sm:my-6 rounded-md flex gap-3 items-center">
                    {channelData?.owner == user?._id ? (
                      <>
                        <Link
                          to={"/uploadVideo"}
                          className=" transition-all bg-gray-700 text-white rounded-md  hover:bg-black px-4 py-1 border "
                        >
                          Upload Video
                        </Link>
                        <Link
                          to={`/updateChannel/${channelData?._id}`}
                          className=" transition-all bg-gray-700 text-white rounded-md  hover:bg-black px-4 py-1 border "
                        >
                          Edit Channel
                        </Link>
                      </>
                    ) : (
                      " Videos"
                    )}
                  </h2>
                </div>
              </div>
            ) : (
              <h2>No Channel Found</h2>
            )}

            {/* display video grid below */}
            <div className="flex flex-wrap gap-8">
              {channelVideos && channelVideos.length >= 1 ? (
                channelVideos.map((item) => (
                  <ChannelVideo
                    triggerVideoFetching={triggerVideoFetching}
                    channelData={channelData}
                    key={item._id}
                    item={item}
                  />
                ))
              ) : (
                <h2>no videos to display</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetail;
