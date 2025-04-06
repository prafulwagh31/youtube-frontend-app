import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchVideoView from "./SearchVideoView";

const SearchVideos = () => {
  const [searchVideos, setSearchvideos] = useState([]);

  const params = useParams();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-pjh2.onrender.com/youtube/search/${params.searchItem}`
        );
        if (data) {
          setSearchvideos(data.videos);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetchVideos();
  }, [params]);

  return (
    <div>
      <h2>Results for : "{params.searchItem}"</h2>
      <div className="searchItems flex flex-col gap-4 ">
        {searchVideos && searchVideos.length >= 1 ? (
          searchVideos.map((item) => (
            <SearchVideoView key={item._id} item={item} />
          ))
        ) : (
          <h2 className="font-semibold">No videos matched your search</h2>
        )}
      </div>
    </div>
  );
};

export default SearchVideos;
