import {api} from "./api";

export const createProject=(date)=>{
    api.post('/api/projects',date);
}

export const getProjects=async()=>{
    api.get('/api/projects');
}

export const getProjectById=async(id)=>{
    api.get(`/api/projects/${id}`);
}

export const updateProject=async(id,data)=>{
    api.put(`/api/projects/${id}`,data);
}

export const deleteProject=async(id)=>{
    api.delete(`/api/projects/${id}`);
}

export const uploadImage=async(id,file)=>{
    const form=new FormData();
    form.append('image',file);

    return api.post(`/api/projects/${id}/images`,form,{
        headers:{
            'Content-Type':'multipart/form-data',
        },
    });
}