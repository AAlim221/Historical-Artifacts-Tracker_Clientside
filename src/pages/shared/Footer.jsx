import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1f140c] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-extrabold text-yellow-400">
              🏺 ArtifactVault
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              Explore ancient civilizations, discover priceless artifacts,
              and preserve the stories of human history through our
              historical artifact tracking platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-artifacts"
                  className="hover:text-yellow-400 transition"
                >
                  All Artifacts
                </Link>
              </li>

              <li>
                <Link
                  to="/add-artifact"
                  className="hover:text-yellow-400 transition"
                >
                  Add Artifact
                </Link>
              </li>

              <li>
                <Link
                  to="/my-artifacts"
                  className="hover:text-yellow-400 transition"
                >
                  My Artifacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">
              <p>📍 Dhaka, Bangladesh</p>

              <p>📧 support@artifactvault.com</p>

              <p>📞 +880 1234-567890</p>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black font-bold transition"
              >
                F
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black font-bold transition"
              >
                T
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black font-bold transition"
              >
                I
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} ArtifactVault — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;