import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import { requireAuth } from './middlewares/auth.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://project-manager-lovat-iota.vercel.app/",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get('/auth/check', requireAuth, (req, res) => {
  res.json({ authenticated: true });
});

app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);

export default app;