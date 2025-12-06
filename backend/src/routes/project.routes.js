import express from 'express';
import { requireAuth } from '../middlewares/auth.js';

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
  uploadProjectVideo,
  deleteProjectVideo
} from "../controllers/project.controller.js";

import { upload } from '../middlewares/multer.js';

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/all", requireAuth, getProjects);
router.get("/:id", getProjectById);

// Admin
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

// Images
router.post("/:id/images", requireAuth, upload.array("images", 20), uploadProjectImages);
router.delete("/:id/images", requireAuth, deleteProjectImage);

// Videos
router.post("/:id/video", requireAuth, upload.single("video"), uploadProjectVideo);
router.delete("/:id/video", requireAuth, deleteProjectVideo);

export default router;
