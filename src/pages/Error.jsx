import { Link, useRouteError, useNavigate } from "react-router-dom";
import {
  ArrowUturnLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong 😕
        </h1>

        <p className="text-gray-600 mb-6">
          {error?.message || error?.statusText || "An unexpected error occurred."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            <ArrowUturnLeftIcon className="w-5 h-5" />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <HomeIcon className="w-5 h-5" />
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Error;