import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/projectApi";
import ReactMarkdown from "react-markdown";
import {
  FiGithub,
  FiExternalLink,
  FiTag,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import AutoScrollDragSlider from "../components/AutoScrollDragSlider";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectById(id).then((res) => setProject(res.data || res));
  }, [id]);

  if (!project) return <p className="p-10">Loading...</p>;

  return (
    <div className="relative pb-32 max-w-7xl mx-auto px-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow bg-white border 
                   hover:bg-gray-100 transition fixed top-7 left-5 z-30"
      >
        <FiChevronLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-24">

        <div className="space-y-16 animate-fadeIn">

          <section className="space-y-4 animate-fadeUp">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight 
                           bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed">
              {project.summary}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-gray-300 to-transparent mt-6"></div>
          </section>

          <section className="space-y-6 animate-fadeUp [animation-delay:0.15s]">

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm flex items-center gap-1
                               bg-blue-50 border border-blue-200 text-blue-700 shadow-sm
                               hover:bg-blue-100 transition"
                  >
                    <FiTag size={14} /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              {project.githubUrl && (
                <a
                  href={
                    project.githubUrl.startsWith("http")
                      ? project.githubUrl
                      : "https://" + project.githubUrl
                  }
                  target="_blank"
                  className="px-5 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 
                             shadow hover:scale-105 hover:bg-black transition"
                >
                  <FiGithub size={20} /> GitHub
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={
                    project.liveUrl.startsWith("http")
                      ? project.liveUrl
                      : "https://" + project.liveUrl
                  }
                  target="_blank"
                  className="px-5 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 
                             shadow hover:scale-105 hover:bg-green-700 transition"
                >
                  <FiExternalLink size={20} /> Live Demo
                </a>
              )}
            </div>
          </section>

          {project.techStack?.length > 0 && (
            <section className="animate-fadeUp [animation-delay:0.25s]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  Tech Stack
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl 
                               text-gray-800 shadow-sm hover:bg-gray-200 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mt-4 animate-fadeUp [animation-delay:0.35s]">
            <h2 className="text-2xl font-semibold mb-3">About This Project</h2>

            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed 
                            prose-headings:font-semibold prose-a:text-blue-600">
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl shadow border animate-fadeUp [animation-delay:0.45s]">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              Project Info
            </h3>

            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
              <div>
                <span className="font-medium">Visibility:</span> {project.visibility}
              </div>
              <div>
                <span className="font-medium">Year:</span> {project.year}
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </section>
        </div>

        <div className="hidden lg:block fixed right-20 top-24 w-[600px]">
          <div className="w-full rounded-xl shadow-2xl overflow-hidden 
                          ring-1 ring-gray-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.08)] transition">
            {project.images?.length > 0 && (
              <AutoScrollDragSlider images={project.images} interval={2500} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
