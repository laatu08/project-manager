import Project from "../models/Project.js";

import cloudinary from "../services/cloudinary.js";


export const createProject = async (req, res) => {
  try {
    let {
      title,
      summary,
      description,
      techStack,
      tags,
      githubUrl,
      liveUrl,
      year,
      visibility
    } = req.body;

    // Convert comma-separated strings → arrays
    if (typeof techStack === "string") {
      techStack = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    const project = await Project.create({
      title,
      summary,
      description,
      techStack,
      tags,
      githubUrl,
      liveUrl,
      year,
      visibility,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user?.role === "admin") {
      projects = await Project.find().sort({ createdAt: -1 });
    }
    else {
      projects = await Project.find({ visibility: "public" }).sort({ createdAt: -1 });
    }

    res.json(projects);
  } catch (error) {
    console.error("Error in getProjects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
}


export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.visibility !== "public" && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({ message: "Error fetching project" });
  }
}


export const updateProject = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // Convert techStack to array if it is a comma-separated string
    if (typeof updatedData.techStack === "string") {
      updatedData.techStack = updatedData.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    // Convert tags to array if it is a comma-separated string
    if (typeof updatedData.tags === "string") {
      updatedData.tags = updatedData.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error in updateProject:", error);
    res.status(500).json({ message: "Error updating project" });
  }
};



export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProject:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
}


export const uploadProjectImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imageUploads = [];

    for (let file of req.files) {
      // Wrap Cloudinary upload in a Promise
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "project_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      });

      imageUploads.push(uploadPromise);
    }

    // Wait for all uploads
    const uploadedUrls = await Promise.all(imageUploads);

    // Convert uploaded URLs to DB format
    const imagesArray = uploadedUrls.map((url) => ({
      url,
      alt: "Project Image",
    }));

    // Insert ALL images into database at once
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: imagesArray } } },
      { new: true }
    );

    return res.status(200).json({
      message: "Images uploaded successfully",
      images: imagesArray,
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    res.status(500).json({ message: "Error uploading multiple images" });
  }
};

