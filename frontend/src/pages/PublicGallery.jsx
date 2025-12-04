import { useEffect, useState } from "react";
import { getProjects } from "../services/projectApi";
import { Link } from "react-router-dom";
import AutoSlider from "../components/AutoSlider";
import { FiSearch, FiBox } from "react-icons/fi";

export default function PublicGallery() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res); 
      setLoading(false);
    });
  }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* ---------------- HERO ---------------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Project <span className="text-blue-600">Gallery</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Explore all projects created by <span className="font-semibold">Partha Borah</span>.
        </p>
      </div>

      {/* ---------------- SEARCH BAR ---------------- */}
      <div className="relative max-w-xl mx-auto mb-10">
        <FiSearch className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ---------------- LOADING ---------------- */}
      {loading && (
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading projects...
        </div>
      )}

      {/* ---------------- EMPTY STATE ---------------- */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <FiBox className="mx-auto mb-3" size={40} />
          <p>No projects found.</p>
        </div>
      )}

      {/* ---------------- PROJECT GRID ---------------- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, index) => (
          <Link
            key={project._id}
            to={`/projects/${project._id}`}
            className="rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 group"
            style={{ animation: `fadeIn 0.4s ease ${index * 0.05}s` }}
          >
            {/* Image Slider */}
            <div className="h-52 w-full overflow-hidden">
  <AutoSlider images={project.images} interval={2500} height="h-52" />
</div>


            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
                {project.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {project.summary}
              </p>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Fade-in animation */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        `}
      </style>
    </div>
  );
}
