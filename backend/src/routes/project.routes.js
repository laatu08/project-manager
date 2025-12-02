import express from 'express';
import { requireAuth } from '../middlewares/auth.js';

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadProjectImage,
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

router.post("/:id/images", requireAuth, upload.single("image"), uploadProjectImage);

export default router;