import { useEffect, useState } from "react";
import { getProjects } from "../services/projectApi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    public: 0,
    private: 0,
    draft: 0,
  });

  useEffect(() => {
    getProjects().then((res) => {
      const data = res;

      setStats({
        total: data.length,
        public: data.filter((p) => p.visibility === "public").length,
        private: data.filter((p) => p.visibility === "private").length,
        draft: data.filter((p) => p.visibility === "draft").length,
      });
    });
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back! Manage your project gallery below.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total Projects" value={stats.total} color="bg-blue-600" />
        <StatCard title="Public" value={stats.public} color="bg-green-600" />
        <StatCard title="Private" value={stats.private} color="bg-gray-700" />
        <StatCard title="Drafts" value={stats.draft} color="bg-yellow-500" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-semibold mt-12 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Create New Project"
          text="Add a new project to your portfolio gallery."
          link="/admin/projects/new"
          buttonText="Create Project"
        />

        <ActionCard
          title="Manage Projects"
          text="Edit or remove projects from your public gallery."
          link="/admin/projects"
          buttonText="Manage Projects"
        />
      </div>
    </div>
  );
}

// ------------------------- Components -------------------------

function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow ${color}`}>
      <p className="text-sm uppercase opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function ActionCard({ title, text, link, buttonText }) {
  return (
    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>

      <Link
        to={link}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}
