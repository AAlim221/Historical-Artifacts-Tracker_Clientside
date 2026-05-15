import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import AuthContext from "../../context/AuthContext";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);

  const handleAddArtifact = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newArtifact = {
      artifactName: form.artifactName.value,
      artifactImage: form.artifactImage.value,
      artifactType: form.artifactType.value,
      historicalContext: form.historicalContext.value,
      shortDescription: form.shortDescription.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
      adderName: user?.displayName,
      adderEmail: user?.email,
      likeCount: 0,
      likedBy: [],
    };

    try {
      const { data } = await axios.post(
        "https://historical-server.vercel.app/artifacts",
        newArtifact,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (data.insertedId) {
        toast.success("Artifact added successfully");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add artifact");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ec] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-yellow-200">
        <h2 className="text-4xl font-bold text-center text-[#2b1d12] mb-8">
          Add New Artifact
        </h2>

        <form onSubmit={handleAddArtifact} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label font-semibold">Artifact Name</label>
            <input name="artifactName" type="text" className="input input-bordered w-full" placeholder="Rosetta Stone" required />
          </div>

          <div>
            <label className="label font-semibold">Artifact Image URL</label>
            <input name="artifactImage" type="url" className="input input-bordered w-full" placeholder="https://example.com/image.jpg" required />
          </div>

          <div>
            <label className="label font-semibold">Artifact Type</label>
            <select name="artifactType" className="select select-bordered w-full" required>
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
            <label className="label font-semibold">Created At</label>
            <input name="createdAt" type="text" className="input input-bordered w-full" placeholder="100 BC" required />
          </div>

          <div>
            <label className="label font-semibold">Discovered At</label>
            <input name="discoveredAt" type="text" className="input input-bordered w-full" placeholder="1799" required />
          </div>

          <div>
            <label className="label font-semibold">Discovered By</label>
            <input name="discoveredBy" type="text" className="input input-bordered w-full" placeholder="Pierre-François Bouchard" required />
          </div>

          <div>
            <label className="label font-semibold">Present Location</label>
            <input name="presentLocation" type="text" className="input input-bordered w-full" placeholder="British Museum" required />
          </div>

          <div>
            <label className="label font-semibold">Adder Name</label>
            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>

          <div>
            <label className="label font-semibold">Adder Email</label>
            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100" />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold">Short Description</label>
            <textarea name="shortDescription" className="textarea textarea-bordered w-full" placeholder="Write a short description" required />
          </div>

          <div className="md:col-span-2">
            <label className="label font-semibold">Historical Context</label>
            <textarea name="historicalContext" className="textarea textarea-bordered w-full min-h-32" placeholder="Write historical context" required />
          </div>

          <div className="md:col-span-2">
            <button className="btn w-full bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold">
              Add Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtifact;