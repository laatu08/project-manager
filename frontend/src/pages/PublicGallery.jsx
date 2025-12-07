import { useEffect, useRef, useState } from "react";
import { getProjects } from "../services/projectApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AutoSlider from "../components/AutoSlider";
import { FiSearch, FiBox } from "react-icons/fi";

export default function PublicGallery() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [techMode, setTechMode] = useState(false);
  const [techQuery, setTechQuery] = useState("");

  const [selectedTechs, setSelectedTechs] = useState([]); // MULTI SELECT

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allTechs = [
    ...new Set(
      projects.flatMap((p) =>
        p.techStack ? p.techStack.map((t) => t.trim()) : []
      )
    ),
  ];

  const filteredTechs = allTechs.filter((t) =>
    t.toLowerCase().includes(techQuery.toLowerCase())
  );

  const filtered = projects.filter((p) => {
    const matchesText =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase());

    const projectTechs = p.techStack?.map((t) => t.toLowerCase()) || [];

    const matchesSelectedTech =
      selectedTechs.length === 0 ||
      selectedTechs.every((selTech) =>
        projectTechs.includes(selTech.toLowerCase())
      );

    return matchesText && matchesSelectedTech;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* ---------------- HERO ---------------- */}

      <div className="text-center mb-10">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Project <span className="text-blue-600">Gallery</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Explore all projects created by{" "}
          <span className="font-semibold">Partha Borah</span>.
        </p>
      </div>

      {/* ---------------- SEARCH BAR ---------------- */}

      <div className="max-w-3xl mx-auto mb-10 relative flex justify-center gap-1">
        <div className="relative w-[100%]">
          {/* SEARCH BAR CONTAINER */}
          <div
            className="w-full min-h-[48px] border rounded-xl shadow-sm
                 flex items-center gap-2 pl-10 pr-4 py-2 flex-wrap 
                 cursor-text"
            onClick={() => {
              if (techMode) document.getElementById("techInput").focus();
            }}
          >
            {/* Search Icon */}
            <FiSearch
              className="absolute left-3 top-3 text-gray-500"
              size={20}
            />

            {/* --- SELECTED TAGS INSIDE SEARCH BAR --- */}
            {techMode &&
              selectedTechs.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 
                       px-2 py-0.5 text-xs rounded-full"
                >
                  {tech}
                  <button
                    className="text-blue-700 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

            {/* Text Input (Shrinks when tags exist) */}
            <input
              id="techInput"
              placeholder={
                techMode
                  ? selectedTechs.length === 0
                    ? "Search by technology..."
                    : ""
                  : "Search projects..."
              }
              className="flex-1 min-w-[120px] outline-none"
              value={techMode ? techQuery : search}
              onChange={(e) => {
                if (techMode) {
                  setTechQuery(e.target.value);
                  setShowDropdown(true);
                } else {
                  setSearch(e.target.value);
                }
              }}
              onFocus={() => techMode && setShowDropdown(true)}
            />
          </div>

          {/* ---------- DROPDOWN ---------- */}
          {techMode && showDropdown && filteredTechs.length > 0 && (
            <div
              className="absolute z-20 w-full bg-white border 
                   shadow-lg rounded-xl mt-1"
              ref={dropdownRef}
            >
              {filteredTechs.map((tech, i) => (
                <div
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                  onClick={() => {
                    if (!selectedTechs.includes(tech)) {
                      setSelectedTechs([...selectedTechs, tech]);
                    }
                    setTechQuery("");
                    setShowDropdown(false);
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              setTechMode(!techMode);
              setShowDropdown(false);
              setTechQuery("");
            }}
            className={`h-12 px-4 rounded-xl text-sm font-medium border 
        ${
          techMode ? "bg-blue-600 text-white" : "bg-black text-gray-50"
        }`}
          >
            {techMode ? "Normal Search" : "Search by Tech"}
          </button>
        </div>
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
              <AutoSlider
                images={project.images}
                interval={2500}
                height="h-52"
              />
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
