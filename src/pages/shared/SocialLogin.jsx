import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google Login Successful");
        navigate(from);
      })
      .catch(() => {
        toast.error("Google Login Failed");
      });
  };

  return (
    <div className="px-8 pb-6">
      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn w-full bg-white text-[#2b1d12] border border-yellow-500 hover:bg-yellow-100"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;