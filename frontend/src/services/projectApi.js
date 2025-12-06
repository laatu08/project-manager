import { api } from "./api";

export const createProject = async (data) => {
  return api.post('/api/projects', data);
};

export const getProjects = async () => {
  const res = await api.get('/api/projects');
  return res.data;
};

export const getAllProjects = async () => {
  const res = await api.get('/api/projects/all');
  return res.data;
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

export const uploadImage = async (id, files) => {
  const form = new FormData();

  for (let file of files) {
    form.append("images", file);
  }

  const res = await api.post(`/api/projects/${id}/images`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};


// Delete image
export const deleteImage = (projectId, url) =>
  api.delete(`/api/projects/${projectId}/images`, {
    headers: { "Content-Type": "application/json" },
  data: { url },
  });


export const uploadVideo = async (projectId, file) => {
  const form = new FormData();
  form.append("video", file);

  const res = await api.post(`/api/projects/${projectId}/video`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteVideo = async (projectId) => {
  // No URL needed because backend removes entire video object
  const res = await api.delete(`/api/projects/${projectId}/video`);
  return res.data;
};
