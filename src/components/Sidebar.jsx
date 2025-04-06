import { PiFilmSlate } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ sideBarToggle }) => {
  return (
    <div
      className={`h-[100%] hidden   overflow-y-scroll py-2 w-72 pl-6 pr-1 ${
        sideBarToggle ? "hidden" : "sm:flex"
      } flex-col gap-1`}
    >
      <Link
        to={"/"}
        className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2"
      >
        <MdHome size={22} />
        Home
      </Link>
      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <SiYoutubeshorts size={20} />
        Shorts
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlineSubscriptions size={20} />
        Subscriptions
      </h2>

      <div className="border-t-2  "></div>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        You {">"}{" "}
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <FaHistory size={20} />
        History
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlinePlaylistPlay size={20} />
        Playlist
      </h2>
      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlineOndemandVideo size={20} />
        Your videos
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlineWatchLater size={20} />
        Watch Later
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <AiOutlineLike size={20} />
        Liked videos
      </h2>

      <div className="border-t-2 "></div>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlineSubscriptions size={20} />
        Subscriptions
      </h2>

      <div className="border-t-2 "></div>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <MdOutlineLocalFireDepartment size={20} />
        Trending
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <LuShoppingBag size={18} />
        Shopping
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <IoMdMusicalNotes size={20} />
        Music
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <PiFilmSlate size={20} />
        Movies
      </h2>

      <div className="border-t-2 "></div>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <CiSettings size={20} />
        Settings
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <IoFlagOutline size={20} />
        Report History
      </h2>

      <h2 className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        <IoIosHelpCircleOutline size={20} />
        Help
      </h2>

      <div className="border-t-2  "></div>

      <p className="hover:bg-gray-100 cursor-pointer transition-all px-2 py-2 flex items-center gap-2">
        &copy; Google LLC
      </p>
    </div>
  );
};

export default Sidebar;
