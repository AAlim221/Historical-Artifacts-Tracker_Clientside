import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    document.title = "Liked Artifacts | ArtifactVault";

    if (user?.email) {
      fetch(`http://localhost:5000/liked-artifacts?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setArtifacts(data))
        .catch((error) => console.log(error));
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-[#f8f4ec] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#2b1d12] mb-3">
          Liked Artifacts
        </h2>

        <p className="text-center text-gray-600 mb-10">
          All artifacts you have liked are listed here.
        </p>

        {artifacts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-yellow-200">
            <h3 className="text-3xl font-bold text-[#2b1d12]">
              No Liked Artifacts Yet
            </h3>

            <p className="text-gray-600 mt-4">
              You have not liked any artifact yet. Explore artifacts and like
              your favorites.
            </p>

            <Link
              to="/all-artifacts"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold mt-6"
            >
              Explore Artifacts
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artifacts.map((artifact) => (
              <div
                key={artifact._id}
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

                  <p className="text-sm text-gray-600">
                    Type: {artifact.artifactType}
                  </p>

                  <p className="text-sm text-gray-600">
                    Location: {artifact.presentLocation}
                  </p>

                  <p className="font-bold text-yellow-600">
                    ❤️ Likes: {artifact.likeCount || 0}
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/artifact/${artifact._id}`}
                      className="btn bg-[#2b1d12] hover:bg-yellow-600 text-white border-none"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedArtifacts;