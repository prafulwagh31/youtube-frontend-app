import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadVideo = () => {
  const navigate = useNavigate();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  useEffect(() => {
    if (!userChannel && Object.keys(userChannel)?.length < 1) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    videoUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function to upload video, only if user is logged in and has a channel
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let videoData = {
      ...formData,
      uploaderAuthor: user?._id,
      channelId: userChannel?._id,
    };

    try {
      let result = await axios.post(
        "https://youtube-backend-pjh2.onrender.com/youtube/addVideo",
        videoData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      console.log(result);
      if (result) {
        toast.success("video added");
        setFormData({
          title: "",
          thumbnailUrl: "",
          description: "",
          category: "",
          videoUrl: "",
        });
        navigate(`/channel/${userChannel?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-full py-32">
      <form
        onSubmit={handleFormSubmit}
        className="form flex   xs:p-6 flex-col w-[90%] xs:w-4/5 sm:w-2/4 mx-auto  bg-white"
      >
        <h2 className="font-bold text-xl">Video Upload</h2>

        <img
          className="w-44 mx-auto rounded-full"
          src={
            "https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg"
          }
          alt="video"
        />
        <label className="text-slate-800 font-semibold py-4" htmlFor="title">
          Video Title
        </label>
        <input
          className="border  p-1  xs:p-2 border-slate-400 rounded-sm"
          id="title"
          type="text"
          required
          value={formData.title}
          name="title"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="thumbnailUrl"
        >
          Thumbnail Url
        </label>
        <input
          className="border   p-1  xs:p-2 border-slate-400 rounded-sm"
          id="thumbnailUrl"
          type="url"
          required
          value={formData.thumbnailUrl}
          name="thumbnailUrl"
          onChange={handleChange}
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="videoUrl">
          Video Url
        </label>
        <input
          className="border   p-1  xs:p-2 border-slate-400 rounded-sm"
          id="videoUrl"
          type="url"
          required
          value={formData.videoUrl}
          name="videoUrl"
          onChange={handleChange}
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="category">
          Category
        </label>

        <select
          name="category"
          className="border   p-1  xs:p-2 border-slate-400 rounded-sm"
          required
          value={formData.category}
          onChange={handleChange}
          id="category"
        >
          <option value="" disabled></option>
          <option value="songs">Songs</option>
          <option value="sports">Sports</option>
          <option value="movies">Movies</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
          <option value="food">Food</option>
          <option value="finance">Finance</option>
          <option value="gaming">Gaming</option>
          <option value="coding">Coding</option>
        </select>

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="description"
        >
          Video Description
        </label>
        <textarea
          rows={5}
          className="border   p-1  xs:p-2 border-slate-400 rounded-sm"
          id="description"
          type="text"
          value={formData.description}
          required
          name="description"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800    p-1  xs:p-2 my-4"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
