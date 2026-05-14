import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Artifact Details | ArtifactVault";

    fetch(`http://localhost:5000/artifacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtifact(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load artifact");
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    fetch(`http://localhost:5000/artifacts/like/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setArtifact({
            ...artifact,
            likeCount: artifact.likeCount + 1,
          });

          toast.success("Artifact liked");
        }
      })
      .catch(() => {
        toast.error("Failed to like artifact");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500">
          Artifact not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f4ec] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={artifact.artifactImage}
              alt={artifact.artifactName}
              className="w-full h-full min-h-[400px] object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-[#2b1d12] mb-4">
              {artifact.artifactName}
            </h1>

            <p className="text-gray-600 mb-6">
              {artifact.shortDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-bold">Type:</span>{" "}
                {artifact.artifactType}
              </p>

              <p>
                <span className="font-bold">Created At:</span>{" "}
                {artifact.createdAt}
              </p>

              <p>
                <span className="font-bold">Discovered At:</span>{" "}
                {artifact.discoveredAt}
              </p>

              <p>
                <span className="font-bold">Discovered By:</span>{" "}
                {artifact.discoveredBy}
              </p>

              <p className="md:col-span-2">
                <span className="font-bold">Present Location:</span>{" "}
                {artifact.presentLocation}
              </p>

              <p className="md:col-span-2">
                <span className="font-bold">Added By:</span>{" "}
                {artifact.adderName} ({artifact.adderEmail})
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#2b1d12] mb-3">
                Historical Context
              </h3>

              <p className="text-gray-700 leading-7">
                {artifact.historicalContext}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleLike}
                className="btn bg-yellow-500 hover:bg-yellow-600 border-none text-black font-bold px-8"
              >
                ❤️ Like
              </button>

              <p className="text-xl font-bold text-[#2b1d12]">
                Likes: {artifact.likeCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;