import Project from "../models/Project.js";

import cloudinary from "../services/cloudinary.js";


// Helper to extract Cloudinary public_id from URL
const extractPublicId = (url) => {
  try {
    // Remove query params
    url = url.split("?")[0];
    // Find "/upload/" position
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;


    // Everything after /upload/
    let publicId = url.substring(uploadIndex + 8); // skip "/upload/"
    // Remove version folder (v123456)
    if (publicId.startsWith("v") && publicId[1] >= "0" && publicId[1] <= "9") {
      publicId = publicId.substring(publicId.indexOf("/") + 1);
    }
    // Remove file extension
    publicId = publicId.replace(/\.[^/.]+$/, ""); 
    return publicId;
  } catch (err) {
    console.error("PublicId Error:", err);
    return null;
  }
};

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
    // console.log("User Role:", req);
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
    const { id } = req.params;

    // 1. Fetch project to access images + video URLs
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. Delete ALL IMAGES from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const img of project.images) {
        const publicId = extractPublicId(img.url);

        if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        }
      }
    }

    // 3. Delete VIDEO from Cloudinary (if exists)
    if (project.video?.url) {
      const videoPublicId = extractPublicId(project.video.url);
      console.log("Deleting video:", videoPublicId);

      if (videoPublicId) {
        await cloudinary.uploader.destroy(videoPublicId, {
          resource_type: "video",
        });
      }
    }

    // 4. Now delete the MongoDB document
    await Project.findByIdAndDelete(id);

    return res.json({ message: "Project and media deleted successfully" });

  } catch (error) {
    console.error("Error in deleteProject:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
};



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







export const deleteProjectImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    console.log("Deleting image URL:", url);
    if (!url) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // 1. Extract Cloudinary public_id
    console.log("Extracting public ID from URL:", url);
    const publicId = extractPublicId(url);
    console.log("Extracted public ID:", publicId);
    // 2. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

    // 3. Remove image from MongoDB
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $pull: { images: { url } } },
      { new: true }
    );

    return res.status(200).json({
      message: "Image deleted successfully",
      project: updatedProject
    });

  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ message: "Image deletion failed" });
  }
};


export const uploadProjectVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // Upload video to Cloudinary using upload_stream
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "project_videos",
          resource_type: "video",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    const uploadResult = await uploadPromise;

    // Build video object for database
    const videoData = {
      url: uploadResult.secure_url,
      thumbnail: uploadResult.secure_url.replace(".mp4", ".jpg"),
      title: req.body.title || "Project Video",
      duration: uploadResult.duration,
    };

    // Update project with single video
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { video: videoData },
      { new: true }
    );

    return res.status(200).json({
      message: "Video uploaded successfully",
      video: videoData,
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Error uploading project video" });
  }
};


export const deleteProjectVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project || !project.video?.url) {
      return res.status(404).json({ message: "No video to delete" });
    }

    // Extract public_id for Cloudinary deletion
    const videoUrl = project.video.url;
    const publicId = extractPublicId(videoUrl);

    // Delete video from Cloudinary
    console.log("Deleting video with public ID:", publicId);
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    // Remove video from DB
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $unset: { video: "" } },
      { new: true }
    );

    res.json({
      message: "Video deleted successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error("Error deleting video:", err);
    res.status(500).json({ message: "Video deletion failed" });
  }
};
