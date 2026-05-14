import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthContext from "../../context/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login Successful");
        navigate(from);
      })
      .catch(() => {
        toast.error("Invalid Email or Password");
      });
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] flex items-center justify-center px-4">
      <div className="card bg-white w-full max-w-md shadow-2xl border border-yellow-200">
        <h1 className="text-4xl font-bold text-center mt-8 text-[#2b1d12]">
          Login Now
        </h1>

        <form onSubmit={handleSignIn} className="card-body">
          <div>
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn bg-yellow-500 hover:bg-yellow-600 border-none w-full text-black font-bold mt-4">
            Login
          </button>

          <p className="text-center mt-4">
            New here?{" "}
            <Link to="/register" className="text-yellow-600 font-bold">
              Register
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default SignIn;