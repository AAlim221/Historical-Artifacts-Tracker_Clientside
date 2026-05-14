import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthContext from "../../context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must have a lowercase letter");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success("Registration Successful");
            navigate("/signIn");
          })
          .catch(() => {
            toast.error("Profile update failed");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] flex items-center justify-center px-4">
      <div className="card bg-white w-full max-w-md shadow-2xl border border-yellow-200">
        <h1 className="text-4xl font-bold text-center mt-8 text-[#2b1d12]">
          Register Now
        </h1>

        <form onSubmit={handleRegister} className="card-body">
          <div>
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

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
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn bg-yellow-500 hover:bg-yellow-600 border-none w-full text-black font-bold mt-4">
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/signIn" className="text-yellow-600 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;