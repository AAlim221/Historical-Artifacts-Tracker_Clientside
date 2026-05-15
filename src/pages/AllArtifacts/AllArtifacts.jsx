import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    document.title = "All Artifacts | ArtifactVault";

    fetchArtifacts();
  }, []);

  const fetchArtifacts = async (search = "") => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://historical-server.vercel.app/search-artifacts?search=${search}`
      );

      setArtifacts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchArtifacts(searchText);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f4ec] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#2b1d12] mb-3">
          All Artifacts
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Explore historical artifacts from different civilizations.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 justify-center mb-10"
        >
          <input
            type="text"
            placeholder="Search artifact by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />

          <button className="btn bg-yellow-500 hover:bg-yellow-600 border-none text-black font-bold">
            Search
          </button>
        </form>

        {artifacts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-yellow-200">
            <h3 className="text-3xl font-bold text-[#2b1d12]">
              No Artifacts Found
            </h3>

            <p className="text-gray-600 mt-4">
              Try searching with another artifact name.
            </p>
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

export default AllArtifacts;