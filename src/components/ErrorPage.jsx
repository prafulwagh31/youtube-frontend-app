import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // error page if any wrong route passed
  const navigate = useNavigate();
  return (
    <div className="text-center gap-2 p-4 font-bold flex-col flex items-center justify-center h-screen">
      <h2 className="text-6xl">404</h2>
      <h2 className="text-xl">Page Not Found</h2>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="border  border-black px-6 py-2 hover:bg-black hover:text-white  transition-all"
      >
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;
