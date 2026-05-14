import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../../pages/Home/Banner";

const Home = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    document.title = "Home | ArtifactVault";

    fetch("http://localhost:5000/featured-artifacts")
      .then((res) => res.json())
      .then((data) => setArtifacts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-[#f8f4ec]">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-[#2b1d12]">
            Featured Artifacts
          </h2>
          <p className="text-gray-600 mt-3">
            Most liked historical artifacts from our collection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.map((artifact) => (
            <motion.div
              key={artifact._id}
              whileHover={{ y: -8 }}
              className="card bg-white shadow-xl border border-yellow-100 overflow-hidden"
            >
              <figure>
                <img
                  src={artifact.artifactImage}
                  alt={artifact.artifactName}
                  className="h-64 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title text-[#2b1d12]">
                  {artifact.artifactName}
                </h3>

                <p className="text-gray-600">
                  {artifact.shortDescription?.slice(0, 100)}...
                </p>

                <p className="font-bold text-yellow-600">
                  ❤️ Likes: {artifact.likeCount || 0}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/artifact/${artifact._id}`}
                    className="btn bg-[#2b1d12] hover:bg-yellow-600 text-white border-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/all-artifacts"
            className="btn bg-yellow-500 hover:bg-yellow-600 border-none text-black font-bold px-8"
          >
            See All
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {["Ancient Tools", "Royal Weapons", "Historical Documents"].map(
            (item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className="bg-[#2b1d12] text-white p-8 rounded-3xl shadow-xl text-center"
              >
                <h3 className="text-2xl font-bold text-yellow-400">{item}</h3>
                <p className="mt-3 text-gray-200">
                  Explore valuable objects that shaped human civilization.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      <section className="bg-[#2b1d12] text-white py-16 px-4 rounded-3xl max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-yellow-400">
            Why Preserve Artifacts?
          </h2>

          <p className="mt-5 text-lg text-gray-200">
            Historical artifacts connect us with ancient cultures, forgotten
            technologies, and powerful stories from the past. ArtifactVault
            helps users record, explore, and appreciate these treasures.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;