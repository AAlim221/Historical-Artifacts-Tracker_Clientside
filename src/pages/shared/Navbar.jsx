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

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-bold bg-transparent"
      : "text-white hover:text-yellow-400 bg-transparent";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-artifacts" className={linkStyle}>
          All Artifacts
        </NavLink>
      </li>

      <li>
        <NavLink to="/add-artifact" className={linkStyle}>
          Add Artifacts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#2b1d12] text-white shadow-lg px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow bg-[#2b1d12] rounded-xl w-56"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-wide">
          🏺 Artifact<span className="text-yellow-400">Vault</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
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
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
              <div className="w-11 rounded-full ring ring-yellow-400 ring-offset-2 ring-offset-[#2b1d12]">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/5GzXkwq/user.png"
                  }
                  alt="User"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 z-50 p-4 shadow-2xl bg-white text-[#2b1d12] rounded-2xl w-72"
            >
              <li className="mb-2 px-2">
                <p className="font-bold text-lg">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-gray-500 break-all">
                  {user?.email}
                </p>
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
                  className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg justify-center"
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