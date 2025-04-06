import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [navigate, user]);
  // signup function to create a user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.userName ||
      !formData.avatar
    ) {
      toast.error("all fields are required");
    }
    try {
      const { userName, email, password, avatar } = formData;
      let { data } = await axios.post(
        "https://youtube-backend-pjh2.onrender.com/youtube/register",
        {
          userName,
          email,
          password,
          avatar,
        }
      );
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-slate-50 min-h-full py-32">
      <form
        onSubmit={handleFormSubmit}
        className="form flex p-6 flex-col w-2/4 mx-auto  bg-white"
      >
        <h2 className="font-bold text-xl">User SignUp</h2>

        <label className="text-slate-800 font-semibold py-4" htmlFor="userName">
          Username
        </label>
        <input
          required
          className="border p-2   border-slate-400 rounded-sm"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
          id="userName"
          type="text"
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="email">
          Email
        </label>
        <input
          required
          className="border p-2 border-slate-400 rounded-sm"
          id="email"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="password">
          Password
        </label>
        <input
          required
          className="border p-2 border-slate-400 rounded-sm"
          id="password"
          type="password"
          value={formData.password}
          name="password"
          autoComplete="true"
          onChange={handleChange}
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="avatar">
          Avatar Link
        </label>
        <input
          required
          className="border p-2 border-slate-400 rounded-sm"
          id="avatar"
          type="text"
          value={formData.avatar}
          name="avatar"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800  p-2 my-4"
        >
          Submit
        </button>
        <p>
          Already have an account !{" "}
          <Link to={"/login"} className="font-bold">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
