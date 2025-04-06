import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import timeAgo from "../utils/timeAgo";

const Comment = ({
  triggerCommentFetch,
  createdAt,
  owner,
  description,
  id,
  video,
}) => {
  const [commentOwner, setCommentOwner] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const user = useSelector((store) => store.user.userDetails);
  const [op, setOp] = useState(false);

  useEffect(() => {
    // fetching the owner of comment
    const fetchOwner = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-pjh2.onrender.com/youtube/getSingleUser/${owner}`
        );
        if (data) {
          setCommentOwner(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, []);

  // function to deletecomment
  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `https://youtube-clone-backend-4sfa.onrender.com/api/comment/deleteComment/${id}/${video}/${user?._id}`
      );
      if (result) {
        toast.success("Comment deleted successfully");
        triggerCommentFetch();
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setOp(false);
    }
  };

  // function to update comment
  const handleUpdate = async () => {
    try {
      const result = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/comment/updateComment/${id}/${video}/${user?._id}`,
        {
          description: editedDescription,
        }
      );
      if (result) {
        toast.success("Comment updated successfully");
        triggerCommentFetch();
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setOp(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-4 bg-slate-100 justify-between  px-2 py-2">
      <div className="flex gap-2">
        <img
          className=" w-12 h-12 rounded-full border border-black"
          src={commentOwner?.avatar}
          alt="avatar"
        />
        <div className="data text-[14px] sm:text-[16px] flex flex-col gap-1">
          <h2>
            {commentOwner?.userName} •{" "}
            <span className="text-slate-700">{timeAgo(createdAt)}</span>
          </h2>

          {isEditing ? (
            <input
              className="outline-none border  px-2 w-[35rem]  py-1"
              onChange={(e) => setEditedDescription(e.target.value)}
              type="text"
              value={editedDescription}
              required
            />
          ) : (
            <p>{description}</p>
          )}

          <div className="flex gap-2 items-center">
            <button>
              {" "}
              <BiLike />{" "}
            </button>
            <button>
              {" "}
              <BiDislike />
            </button>
            <button>reply </button>
          </div>
        </div>
      </div>
      {user?._id === commentOwner?._id ? (
        <div className="btn  relative ">
          <HiOutlineDotsVertical
            className="cursor-pointer "
            onClick={() => setOp(!op)}
          />
          <ul
            className={`${
              op ? "block" : "hidden"
            } absolute bg-white rounded-md shadow-md top-0 right-5`}
          >
            {isEditing ? (
              <li
                onClick={handleUpdate}
                className="p-1 flex gap-1 items-center  px-4 cursor-pointer hover:bg-gray-200 w-full"
              >
                <CiEdit />
                Save
              </li>
            ) : (
              <li
                onClick={() => {
                  setOp(false);
                  setIsEditing(true);
                }}
                className="p-1 flex gap-1 items-center  px-4 cursor-pointer hover:bg-gray-200 w-full"
              >
                <CiEdit />
                Edit
              </li>
            )}

            <li
              onClick={handleDelete}
              className="p-1 flex gap-1 items-center px-4 cursor-pointer hover:bg-gray-200 w-full"
            >
              <MdDeleteOutline />
              Delete
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
