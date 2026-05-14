import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";

const MyArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Artifacts | ArtifactVault";

    if (user?.email) {
      fetch(`http://localhost:5000/my-artifacts?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setArtifacts(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This artifact will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2b1d12",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/artifacts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Artifact deleted successfully.", "success");

              const remaining = artifacts.filter(
                (artifact) => artifact._id !== id
              );

              setArtifacts(remaining);
              navigate("/all-artifacts");
            }
          });
      }
    });
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
          My Artifacts
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Manage the historical artifacts you have added.
        </p>

        {artifacts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-yellow-200">
            <h3 className="text-3xl font-bold text-[#2b1d12]">
              No Artifacts Added Yet
            </h3>

            <p className="text-gray-600 mt-4">
              You have not added any artifact yet. Add your first historical
              artifact now.
            </p>

            <Link
              to="/add-artifact"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold mt-6"
            >
              Add Artifact
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

                  <div className="card-actions justify-between mt-4">
                    <Link
                      to={`/update-artifact/${artifact._id}`}
                      className="btn bg-yellow-500 hover:bg-yellow-600 border-none text-black font-bold"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(artifact._id)}
                      className="btn bg-red-500 hover:bg-red-600 border-none text-white font-bold"
                    >
                      Delete
                    </button>
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

export default MyArtifacts;