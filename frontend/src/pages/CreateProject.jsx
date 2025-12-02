import { useForm } from "react-hook-form";
import { createProject } from "../services/projectApi";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createProject(data);
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

        <button className="bg-green-600 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
}
