import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    document.title = "All Artifacts | ArtifactVault";

    fetch("http://localhost:5000/artifacts")
      .then((res) => res.json())
      .then((data) => setArtifacts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f4ec] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#2b1d12] mb-3">
          All Artifacts
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Explore historical artifacts from different civilizations.
        </p>

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

        {artifacts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No artifacts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllArtifacts;