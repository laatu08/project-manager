import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicGallery from "./pages/PublicGallery";
import ProjectDetail from "./pages/ProjectDetail";
import AdminProjects from "./pages/AdminProjects";
import CreateProject from "./pages/CreateProject";
import SplashIntro from "./pages/SplashIntro";
import EditProject from "./pages/EditProject";
import AdminLayout from "./layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashIntro />} />
        <Route path="/gallery" element={<PublicGallery />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
              <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
              <AdminProjects />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects/:id/edit"
          element={
            <ProtectedRoute>
              <AdminLayout>
              <EditProject />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects/new"
          element={
            <ProtectedRoute>
              <AdminLayout>
              <CreateProject />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
