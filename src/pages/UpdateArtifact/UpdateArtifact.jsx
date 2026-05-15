import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateArtifact = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Update Artifact | ArtifactVault";

    axios
      .get(`https://historical-server.vercel.app/artifacts/${id}`)
      .then((res) => {
        setArtifact(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load artifact");
        setLoading(false);
      });
  }, [id]);

  const handleUpdateArtifact = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedArtifact = {
      artifactName: form.artifactName.value,
      artifactImage: form.artifactImage.value,
      artifactType: form.artifactType.value,
      historicalContext: form.historicalContext.value,
      shortDescription: form.shortDescription.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
    };

    try {
      const { data } = await axios.put(
        `https://historical-server.vercel.app/artifacts/${id}`,
        updatedArtifact,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "access-token"
            )}`,
          },
        }
      );

      if (data.modifiedCount > 0) {
        toast.success("Artifact updated successfully");
        navigate("/my-artifacts");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update artifact");
    }
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
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-yellow-200">
        <h2 className="text-4xl font-bold text-center text-[#2b1d12] mb-8">
          Update Artifact
        </h2>

        <form
          onSubmit={handleUpdateArtifact}
          className="grid md:grid-cols-2 gap-6"
        >
          <div>
            <label className="label font-semibold">
              Artifact Name
            </label>

            <input
              type="text"
              name="artifactName"
              defaultValue={artifact?.artifactName}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">
              Artifact Image URL
            </label>

            <input
              type="url"
              name="artifactImage"
              defaultValue={artifact?.artifactImage}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">
              Artifact Type
            </label>

            <select
              name="artifactType"
              defaultValue={artifact?.artifactType}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Type</option>

              <option value="Tools">Tools</option>
              <option value="Weapons">Weapons</option>
              <option value="Documents">Documents</option>
              <option value="Writings">Writings</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Pottery">Pottery</option>
            </select>
          </div>

          <div>
            <label className="label font-semibold">
              Created At
            </label>

            <input
              type="text"
              name="createdAt"
              defaultValue={artifact?.createdAt}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">
              Discovered At
            </label>

            <input
              type="text"
              name="discoveredAt"
              defaultValue={artifact?.discoveredAt}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">
              Discovered By
            </label>

            <input
              type="text"
              name="discoveredBy"
              defaultValue={artifact?.discoveredBy}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold">
              Present Location
            </label>

            <input
              type="text"
              name="presentLocation"
              defaultValue={artifact?.presentLocation}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold">
              Short Description
            </label>

            <textarea
              name="shortDescription"
              defaultValue={artifact?.shortDescription}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold">
              Historical Context
            </label>

            <textarea
              name="historicalContext"
              defaultValue={artifact?.historicalContext}
              className="textarea textarea-bordered w-full min-h-32"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button className="btn w-full bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold">
              Update Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtifact;