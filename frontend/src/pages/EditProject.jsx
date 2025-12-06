import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getProjectById,
  updateProject,
  uploadImage,
  deleteImage,
  uploadVideo,
  deleteVideo
} from "../services/projectApi";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const [deletedImages, setDeletedImages] = useState([]);
  const [deleteVideoFlag, setDeleteVideoFlag] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // Load project
  useEffect(() => {
    getProjectById(id).then((res) => {
      setProject(res);
      reset(res);
      setLoading(false);
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
  try {
    setSaving(true);

    await updateProject(id, data);

    // Delete removed images
    for (let url of deletedImages) {
      await deleteImage(id, url);
    }

    // Upload new images
    if (files.length > 0) {
      await uploadImage(id, files);
    }

    // Delete existing video if requested
    if (deleteVideoFlag) {
      await deleteVideo(id);
    }

    // Upload new video if chosen
    if (videoFile) {
      await uploadVideo(id, videoFile);
    }

    navigate("/admin/projects");
  } catch (err) {
    console.error("Error saving project:", err);
  } finally {
    setSaving(false);
  }
};


  const handleDeleteImageMark = (url) => {
    setDeletedImages((prev) => [...prev, url]);
    setProject((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.url !== url),
    }));
  };

  if (loading) return <div className="p-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <Link
          to="/admin/projects"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Back
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* -------------------------------- LEFT FORM -------------------------------- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white p-6 rounded-xl shadow-lg lg:col-span-2"
        >
          <Section title="Basic Details" />

          <Input label="Title" register={register("title")} />
          <Input label="Summary" register={register("summary")} />

          <TextArea
            label="Description"
            rows={4}
            register={register("description")}
          />

          <Section title="Tech & Tags" />

          <Input label="Tech Stack" sub="Comma separated" register={register("techStack")} />
          <Input label="Tags" sub="Comma separated" register={register("tags")} />

          <Section title="Links" />

          <Input label="GitHub URL" register={register("githubUrl")} />
          <Input label="Live URL" register={register("liveUrl")} />
          <Input label="Year" type="number" register={register("year")} />

          <div>
            <label className="font-medium">Visibility</label>
            <select
              {...register("visibility")}
              className="w-full mt-2 p-2 border rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <Section title="Upload New Images" />

          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="w-full p-2 border rounded-lg"
          />

          <Section title="Upload / Replace Video" />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="w-full p-2 border rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">Upload a new video (optional)</p>

          {project.video?.url && !videoFile && (
            <button
              type="button"
              onClick={() => setDeleteVideoFlag(true)}
              className="px-3 py-1 mt-2 bg-red-600 text-white text-xs rounded"
            >
              Delete Existing Video
            </button>
          )}

          <Section />

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
  disabled={saving}
  className={`px-4 py-2 rounded-lg text-white flex items-center gap-2
    ${saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
>
  {saving ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Saving...
    </>
  ) : (
    "Save Changes"
  )}
</button>

          </div>
        </form>

        {/* -------------------------------- RIGHT STICKY MEDIA SECTION -------------------------------- */}
        <div className="sticky top-20 h-fit space-y-10">

          {/* Existing Images */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Current Images{" "}
              <span className="text-gray-500 text-sm">
                ({project.images?.length})
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.images?.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img.url}
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />

                  <button
                    onClick={() => handleDeleteImageMark(img.url)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Images Preview */}
          {files.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">New Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    className="w-full h-32 object-cover rounded-lg shadow border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Existing Video */}
          {!videoFile && project.video?.url && !deleteVideoFlag && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Current Video</h2>
              <video
                src={project.video.url}
                controls
                className="w-full rounded-lg shadow"
              ></video>
            </div>
          )}

          {/* New Video Preview */}
          {videoFile && (
            <div>
              <h2 className="text-xl font-semibold mb-3">New Video Preview</h2>
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="w-full rounded-lg shadow"
              ></video>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function Input({ label, register, type = "text", sub }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      {sub && <p className="text-sm text-gray-500">{sub}</p>}
      <input type={type} {...register} className="w-full p-2 border rounded-lg mt-1" />
    </div>
  );
}

function TextArea({ label, register, rows = 3 }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <textarea {...register} rows={rows} className="w-full p-2 border rounded-lg mt-1"></textarea>
    </div>
  );
}

function Section({ title }) {
  if (!title) return <hr className="my-4" />;
  return <h3 className="text-lg font-semibold mt-6">{title}</h3>;
}
