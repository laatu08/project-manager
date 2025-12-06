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
} from "../controllers/project.controller.js";

import { upload } from '../middlewares/multer.js';

const router = express.Router();


// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

router.post("/:id/images", requireAuth, upload.array("images",20), uploadProjectImages);
router.delete("/:id/images", requireAuth, deleteProjectImage);

export default router;