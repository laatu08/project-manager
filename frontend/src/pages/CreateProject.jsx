import { useForm } from "react-hook-form";
import { createProject, uploadImage } from "../services/projectApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateProject() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
    const [files, setFiles] = useState([]);


  const onSubmit = async (data) => {
    const res=await createProject(data);
    console.log("Created Project: ", res);
    const projectId = res.data._id;
    if (files.length > 0) {
      for (let file of files) {
        await uploadImage(projectId, file);
      }
    }

    navigate("/admin/projects");
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Create Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Title" {...register("title")} />
        <input className="w-full p-2 border" placeholder="Summary" {...register("summary")} />
        <textarea className="w-full p-2 border" placeholder="Description" {...register("description")} />
        <input className="w-full p-2 border" placeholder="Tech Stack (comma separated)" {...register("techStack")} />
        <input className="w-full p-2 border" placeholder="Tags (comma separated)" {...register("tags")} />
        <input className="w-full p-2 border" placeholder="Github URL" {...register("githubUrl")} />
        <input className="w-full p-2 border" placeholder="Live URL" {...register("liveUrl")} />
        <input className="w-full p-2 border" placeholder="Year" {...register("year")} />

        <select className="w-full p-2 border" {...register("visibility")}>
          <option value="draft">Draft</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>


        <div>
          <label className="font-semibold">Project Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="w-full p-2 border mt-2"
          />
        </div>

        <button className="bg-green-600 text-white p-2 rounded">Create</button>
      </form>

       {files.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {Array.from(files).map((file, idx) => (
            <img
              key={idx}
              className="w-full rounded border"
              src={URL.createObjectURL(file)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
