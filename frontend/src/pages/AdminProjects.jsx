import React, { useEffect } from 'react'
import { deleteProject, getProjects } from '../services/projectApi'
import { Link } from "react-router-dom";


export default function AdminProjects() {
    const [projects,setProjects]=React.useState([])

    useEffect(()=>{
        getProjects().then(res=>{
          console.log(".......................(",res);
            setProjects(res);
        })
        // console.log(projects);
    },[]);

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <Link
          to="/admin/projects/new"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + New Project
        </Link>
      </div>

      <div className="mt-5 space-y-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* -------- Image + Title Row -------- */}
            <div className="flex gap-4 items-start">
              {/* Thumbnail */}
              {p.images?.length > 0 ? (
                <img
                  src={p.images[0].url}
                  alt="thumbnail"
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                  No Image
                </div>
              )}

              {/* Title & Summary */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{p.title}</h2>
                <p className="text-gray-600 mt-1">{p.summary}</p>

                {/* Visibility Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded text-sm text-white ${
                    p.visibility === "public"
                      ? "bg-green-600"
                      : p.visibility === "private"
                      ? "bg-gray-700"
                      : "bg-yellow-500"
                  }`}
                >
                  {p.visibility.toUpperCase()}
                </span>
              </div>
            </div>

            {/* -------- Tags -------- */}
            {p.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* -------- Tech Stack -------- */}
            {p.techStack?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* -------- Action Buttons -------- */}
            <div className="mt-4 flex gap-3">
              <Link
                to={`/admin/projects/${p._id}/edit`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={async () => {
                  await deleteProject(p._id);
                  setProjects(projects.filter((proj) => proj._id !== p._id));
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
