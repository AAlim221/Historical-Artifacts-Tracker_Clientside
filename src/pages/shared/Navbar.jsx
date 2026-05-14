import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logout successful"))
      .catch(() => toast.error("Logout failed"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-artifacts">All Artifacts</NavLink>
      </li>
      <li>
        <NavLink to="/add-artifact">Add Artifacts</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#2b1d12]/95 text-white shadow-lg px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-[#2b1d12] rounded-box w-56"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          🏺 Artifact<span className="text-yellow-400">Vault</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link
            to="/signIn"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold px-6"
          >
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer"
            >
              <div className="w-11 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co.com/4pDNDk1/avatar.png"
                  }
                  alt="User"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 z-50 p-4 shadow-2xl bg-white text-[#2b1d12] rounded-2xl w-64"
            >
              <li className="mb-3">
                <p className="font-bold text-lg">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </li>

              <div className="divider my-1"></div>

              <li>
                <Link to="/my-artifacts">My Artifacts</Link>
              </li>

              <li>
                <Link to="/liked-artifacts">Liked Artifacts</Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;