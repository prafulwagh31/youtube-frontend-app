import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAccount = () => {
  const userDetails = useSelector((store) => store.user.userDetails);

  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length <= 0) {
      toast.error("login required !");
      navigate("/");
    }
  }, [userDetails]);

  return (
    <div>
      <h2 className="font-bold pb-4 text-xl">Account Details</h2>
      <div className="box flex-col sm:flex-row  flex w-full md:w-2/3   gap-4 sm:items-center p-4 rounded-md shadow-md   border-black">
        <img
          src={userDetails?.avatar}
          className="rounded-full w-40"
          alt="avatar"
        />
        <div className="details">
          <h2>Hello, {userDetails?.userName}</h2>
          <h2 className="py-2">Email : {userDetails?.email}</h2>
          <h2>Account Created : {userDetails?.createdAt?.split("T")[0]}</h2>
        </div>
      </div>
      <h2 className="font-bold text-xl py-4">
        Channels associated with your account
      </h2>

      <div className="box  flex w-full md:w-2/3 gap-4 items-center p-4 rounded-md shadow-md   border-black">
        {userChannel && Object.keys(userChannel).length >= 1 ? (
          <div key={userChannel._id} className="p-4 shadow-md">
            {" "}
            <img
              src={userChannel?.channelLogo}
              className="rounded-full border-4   w-32"
              alt="avatar"
            />
            <div className="details w-36 py-2">
              <h2>{userChannel?.channelName}</h2>
            </div>{" "}
          </div>
        ) : (
          "You dont have any channel, you can create one"
        )}
      </div>
    </div>
  );
};

export default UserAccount;
