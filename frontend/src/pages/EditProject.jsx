import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getProjectById,
  updateProject,
  uploadImage,
  deleteImage,
} from "../services/projectApi";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);


  // Load project data
  useEffect(() => {
    getProjectById(id).then((res) => {
      setProject(res);
      reset(res); // pre-fill form
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
  // 1. Update basic project fields
  await updateProject(id, data);

  // 2. Delete images marked for removal
  if (deletedImages.length > 0) {
    for (let url of deletedImages) {
      await deleteImage(id, url);
    }
  }

  // 3. Upload new images
  if (files.length > 0) {
    await uploadImage(id, files);
  }

  navigate("/admin/projects");
};


//   const handleDeleteImage = async (url) => {
//     await deleteImage(id, url);
//     setProject((prev) => ({
//       ...prev,
//       images: prev.images.filter((img) => img.url !== url),
//     }));
//   };

  const handleDeleteMark = (url) => {
  setDeletedImages((prev) => [...prev, url]);
  setProject((prev) => ({
    ...prev,
    images: prev.images.filter((img) => img.url !== url),
  }));
};


  if (!project) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="w-full p-2 border"
          {...register("title")}
          placeholder="Title"
        />
        <input
          className="w-full p-2 border"
          {...register("summary")}
          placeholder="Summary"
        />
        <textarea
          className="w-full p-2 border h-32"
          {...register("description")}
          placeholder="Description"
        />

        <input
          className="w-full p-2 border"
          {...register("techStack")}
          placeholder="Tech Stack (comma separated)"
        />
        <input
          className="w-full p-2 border"
          {...register("tags")}
          placeholder="Tags (comma separated)"
        />

        <input
          className="w-full p-2 border"
          {...register("githubUrl")}
          placeholder="Github URL"
        />
        <input
          className="w-full p-2 border"
          {...register("liveUrl")}
          placeholder="Live URL"
        />
        <input
          className="w-full p-2 border"
          type="number"
          {...register("year")}
          placeholder="Year"
        />

        <select className="w-full p-2 border" {...register("visibility")}>
          <option value="draft">Draft</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="w-full p-2 border mt-2"
          />
        </div>

        <button className="bg-blue-600 text-white p-2 rounded">
          Save Changes
        </button>
      </form>

      {/* Existing images */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Current Images</h2>

        <div className="grid grid-cols-3 gap-4">
          {project.images?.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-28 object-cover rounded"
              />

              {/* Delete button */}
              <button
                onClick={() => handleDeleteMark(img.url)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
