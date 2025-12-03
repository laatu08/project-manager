import { useEffect, useState } from "react";
import { getProjects } from "../services/projectApi";
import { Link } from "react-router-dom";

export default function PublicGallery() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProjects().then(res => setProjects(res));
  }, []);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">My Projects</h1>

      <input
        placeholder="Search projects..."
        className="w-full border p-2 mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map(project => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            className="border rounded shadow hover:shadow-lg transition p-4"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.summary}</p>

            {project.images?.[0] && (
              <img
                src={project.images[0].url}
                className="mt-3 h-40 w-full object-cover rounded"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
