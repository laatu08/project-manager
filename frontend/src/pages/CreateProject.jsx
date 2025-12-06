import { useForm } from "react-hook-form";
import { createProject, uploadImage, uploadVideo } from "../services/projectApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateProject() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [video, setVideo] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await createProject(data);
      const projectId = res.data._id;

      // Upload images if selected
      if (files.length > 0) {
        await uploadImage(projectId, files);
      }

      // Upload single video if selected
      if (video) {
        await uploadVideo(projectId, video);
      }

      reset();
      navigate("/admin/projects");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SECTION — FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white p-6 rounded-xl shadow"
        >
          <Input label="Title" register={register("title")} />
          <Input label="Summary" register={register("summary")} />
          <TextArea label="Description" register={register("description")} rows={4} />

          <Input
            label="Tech Stack"
            sub="(comma separated: React, Node, MongoDB)"
            register={register("techStack")}
          />

          <Input
            label="Tags"
            sub="(comma separated: web, ai, backend)"
            register={register("tags")}
          />

          <Input label="GitHub URL" register={register("githubUrl")} />
          <Input label="Live URL" register={register("liveUrl")} />
          <Input label="Year" register={register("year")} type="number" />

          {/* Visibility */}
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

          {/* Image Upload */}
          <div>
            <label className="font-medium block">Project Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
              className="w-full mt-2 p-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">You can upload multiple images</p>
          </div>

          {/* VIDEO UPLOAD */}
          <div>
            <label className="font-medium block">Project Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full mt-2 p-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Upload one video (optional)</p>
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-medium">
            Create Project
          </button>
        </form>

        {/* RIGHT SECTION — PREVIEWS */}
        <div className="sticky top-20 h-fit space-y-6">
          {/* IMAGE PREVIEW */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Image Preview</h2>

            {files.length === 0 ? (
              <div className="h-40 flex items-center justify-center border rounded-lg text-gray-500">
                No images selected
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VIDEO PREVIEW (STICKY LIKE IMAGES) */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Video Preview</h2>

            {!video ? (
              <div className="h-40 flex items-center justify-center border rounded-lg text-gray-500">
                No video selected
              </div>
            ) : (
              <video
                src={URL.createObjectURL(video)}
                controls
                className="w-full rounded-lg shadow"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- REUSABLE COMPONENTS ---------------------- */

function Input({ label, register, type = "text", sub }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      {sub && <p className="text-xs text-gray-500 -mt-1 mb-1">{sub}</p>}
      <input type={type} {...register} className="w-full p-2 border rounded-lg" />
    </div>
  );
}

function TextArea({ label, register, rows = 3 }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <textarea
        {...register}
        rows={rows}
        className="w-full p-2 border rounded-lg"
      ></textarea>
    </div>
  );
}
