import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateVideoForm = () => {
  const params = useParams("");
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    category: "",
    videoUrl: "",
  });

  useEffect(() => {
    // fetch video with id
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/${params.id}`
      );

      if (data.video.uploader !== user._id) {
        navigate("/");
        toast.error("unauthorised access !");
      }
      if (data) {
        setFormData({
          title: data?.video?.title || "",
          thumbnailUrl: data?.video?.thumbnailUrl || "",
          category: data?.video?.category || "",
          description: data?.video?.description || "",
          videoUrl: data?.video?.videoUrl || "",
        });
      }
    };
    fetchData();
  }, [params]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // functino to update a video
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/updateVideo/${params.id}/${userChannel?._id}/${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("video updated");
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
    <form
      onSubmit={handleFormSubmit}
      className="updateVideo form flex  xs:p-6 flex-col  w-[90%] xs:w-4/5 sm:w-2/4  mx-auto  bg-white"
    >
      <h2 className="font-bold text-xl">Edit Video</h2>

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
        className="border p-1  xs:p-2 border-slate-400 rounded-sm"
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
        className="border p-1  xs:p-2 border-slate-400 rounded-sm"
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
        className="border p-1  xs:p-2 border-slate-400 rounded-sm"
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
        className="border p-1  xs:p-2 border-slate-400 rounded-sm"
        required
        value={formData.category}
        onChange={handleChange}
        id="category"
      >
        <option value="" disabled></option>
        <option value="songs">Songs</option>
        <option value="movies">Movies</option>
        <option value="education">Education</option>
        <option value="infotainment">Infotainment</option>
        <option value="food">Food</option>
        <option value="fashion">Fashion</option>
        <option value="vlog">Vlog</option>
        <option value="finance">Finance</option>
        <option value="gaming">Gaming</option>
      </select>

      <label
        className="text-slate-800 font-semibold py-4"
        htmlFor="description"
      >
        Video Description
      </label>
      <textarea
        rows={5}
        className="border p-1  xs:p-2 border-slate-400 rounded-sm"
        id="description"
        type="text"
        value={formData.description}
        required
        name="description"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800  p-1  xs:p-2 my-4"
      >
        Save
      </button>
    </form>
  );
};

export default UpdateVideoForm;
