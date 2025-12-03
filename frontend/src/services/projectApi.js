import { api } from "./api";

export const createProject = async (data) => {
  return api.post('/api/projects', data);
};

export const getProjects = async () => {
  const res = await api.get('/api/projects');
  return res.data;          // 🔥 important
};

export const getProjectById = async (id) => {
  const res = await api.get(`/api/projects/${id}`);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/api/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/api/projects/${id}`);
  return res.data;
};

export const uploadImage = async (id, file) => {
  const form = new FormData();
  form.append('image', file);

  const res = await api.post(`/api/projects/${id}/images`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
