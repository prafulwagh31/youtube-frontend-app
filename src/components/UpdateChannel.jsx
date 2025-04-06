import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserState } from "../utils/userSlice";
import { setUserChannelDetails } from "../utils/userChannelSlice";

const UpdateChannel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  useEffect(() => {
    if (!userChannel && Object.keys(userChannel)?.length < 1) {
      navigate("/");
    } else {
      fetchChannelData();
    }
  }, []);

  // function to fetch channel details
  const fetchChannelData = async () => {
    const { data } = await axios.get(
      `https://youtube-clone-backend-4sfa.onrender.com/api/channel/${params.id}`
    );
    if (data) {
      setFormData({
        channelLogo: data?.channel?.channelLogo || "",
        channelName: data?.channel?.channelName || "",
        description: data?.channel?.description || "",
        channelBanner: data?.channel?.channelBanner || "",
      });
    }
  };

  // onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function to update channel
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/channel/updateChannel/${params.id}/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        dispatch(setUserChannelDetails(result.data.channel));
        toast.success("channel updated");
        navigate(`/channel/${userChannel._id}`);
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
        <h2 className="font-bold text-xl">How you will appear</h2>

        <img
          className="w-44 mx-auto rounded-full"
          src={
            formData?.channelLogo ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          alt="channelLogo"
        />
        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelName"
        >
          Channel Name
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelName"
          type="text"
          required
          value={formData.channelName}
          name="channelName"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelLogo"
        >
          Channel Logo
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelLogo"
          type="url"
          required
          value={formData.channelLogo}
          name="channelLogo"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelBanner"
        >
          Channel Banner
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelBanner"
          type="url"
          required
          value={formData.channelBanner}
          name="channelBanner"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="description"
        >
          Channel Description
        </label>
        <input
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
          Update Channel
        </button>
      </form>
    </div>
  );
};

export default UpdateChannel;
