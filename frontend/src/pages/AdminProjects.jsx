import React, { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../services/projectApi";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit, FiMoreVertical, FiImage } from "react-icons/fi";
import AutoSlider from "../components/AutoSlider";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null); // dropdown menu id
  const [deleteId, setDeleteId] = useState(null); // for confirmation modal

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <Link
          to="/admin/projects/new"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + New Project
        </Link>
      </div>

      {/* Project Cards */}
      <div className="mt-6 grid md:grid-cols-2 gap-6 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-lg border transition p-4 relative"
          >
            {/* Action Menu */}
            <div className="absolute top-3 right-3 z-30">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === p._id ? null : p._id)
                }
                className="text-gray-500 hover:text-black"
              >
                <FiMoreVertical size={20} />
              </button>

              {menuOpen === p._id && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded-lg z-20">
                  <Link
                    to={`/admin/projects/${p._id}/edit`}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <FiEdit /> Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            {p.images?.length > 0 ? (
              // <img
              //   src={p.images[0].url}
              //   className="w-full h-40 object-cover rounded-lg"
              //   alt="thumbnail"
              // />
                <AutoSlider images={p.images} interval={2500} height="h-52" />
              
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                <FiImage className="text-gray-400" size={40} />
              </div>
            )}

            {/* Title & Summary */}
            <h2 className="text-xl font-semibold mt-4">{p.title}</h2>
            <p className="text-gray-600 line-clamp-2">{p.summary}</p>

            {/* Visibility Badge */}
            <span
              className={`inline-block mt-3 px-3 py-1 text-sm text-white rounded-full ${
                p.visibility === "public"
                  ? "bg-green-600"
                  : p.visibility === "private"
                  ? "bg-gray-700"
                  : "bg-yellow-500"
              }`}
            >
              {p.visibility.toUpperCase()}
            </span>

            {/* Tags */}
            {p.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {p.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{p.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <DeleteModal
          onConfirm={async () => {
            await deleteProject(deleteId);
            setProjects(projects.filter((pr) => pr._id !== deleteId));
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

/* ---------------- MODAL COMPONENT ---------------- */

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold">Delete Project?</h2>
        <p className="text-gray-600 mt-2 mb-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
