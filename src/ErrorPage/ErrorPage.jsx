import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f4ec]">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <p className="text-2xl font-semibold mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg font-bold"
      >
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;