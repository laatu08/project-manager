# Project Gallery Manager

A full-stack project portfolio management system with a public gallery showcase and admin dashboard. Built for developers to showcase their work with rich media support, advanced search capabilities, and a modern UI.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [API Documentation](#api-documentation)
9. [Frontend Routes](#frontend-routes)
10. [Database Schema](#database-schema)
11. [Authentication](#authentication)
12. [Media Management](#media-management)
13. [Deployment](#deployment)

---

## Overview

This project is a professional portfolio management system designed for developers to showcase their projects. It features a beautiful public gallery for visitors and a comprehensive admin panel for managing projects, images, and videos.

**Key Highlights:**
- Public gallery with advanced search and filtering
- Secure admin dashboard with full CRUD operations
- Multi-image and video upload with Cloudinary CDN
- Responsive design with smooth animations
- Real-time project visibility control (public, private, draft)
- Markdown support for rich project descriptions

---

## Features

### Public Features

#### 1. **Splash Intro Page**
- Animated landing page with gradient background
- Auto-redirects to gallery after 5 seconds
- Skip intro button for immediate access
- Professional branding display

#### 2. **Public Gallery**
- Grid layout displaying all public projects
- Auto-sliding image carousel for each project (3-image preview)
- Card hover animations with shadow effects
- Project tags and summary preview
- Responsive design (mobile, tablet, desktop)

#### 3. **Advanced Search & Filtering**
- **Text Search**: Search by project title or summary
- **Technology Search**: Multi-select tech stack filter
  - Dropdown suggestions based on all available technologies
  - Selected tech tags display in search bar
  - Can combine multiple technologies (AND logic)
  - Toggle between normal and tech search modes

#### 4. **Project Detail Page**
- Full project information display
- Dual-view media gallery:
  - **Images Mode**: Auto-scrolling/drag-enabled slider
  - **Video Mode**: Embedded video player with controls
- Toggle between image and video views
- Markdown-rendered project description
- Tech stack badges
- Project metadata (year, visibility, dates)
- GitHub and Live Demo links
- Tag system for categorization
- Back navigation button

### Admin Features

#### 5. **Admin Authentication**
- Secure login system with JWT tokens
- HTTP-only cookie-based session management
- Protected routes with authentication middleware
- Auto-redirect on unauthorized access
- Session verification on page refresh

#### 6. **Admin Dashboard**
- Statistics overview:
  - Total projects count
  - Public projects count
  - Private projects count
  - Draft projects count
- Quick action cards:
  - Create New Project
  - Manage Projects
- Responsive stat cards with color coding

#### 7. **Admin Sidebar Layout**
- Fixed sidebar navigation:
  - Dashboard
  - Projects List
  - Create Project
  - Logout
- Sticky top navbar with user info
- Icon-based navigation
- Responsive layout

#### 8. **Projects Management**
- Grid view of all projects (public, private, draft)
- 3-dot menu for each project:
  - Edit
  - Delete
- Auto-sliding thumbnail preview (3 images)
- Visibility badges (color-coded)
- Tag preview (first 3 tags + count)
- Delete confirmation modal
- Loading states during deletion

#### 9. **Create Project**
- Two-column layout:
  - **Left**: Form inputs
  - **Right**: Live previews (sticky)
- Form fields:
  - Title, Summary, Description
  - Tech Stack (comma-separated)
  - Tags (comma-separated)
  - GitHub URL, Live URL
  - Year
  - Visibility (draft/public/private)
  - Multi-image upload
  - Single video upload
- Real-time image preview grid
- Real-time video preview
- Loading state during creation
- Auto-navigation to projects list on success

#### 10. **Edit Project**
- Pre-filled form with existing data
- Three-column responsive layout
- **Media Management**:
  - View current images with hover-to-delete
  - Upload additional images
  - Preview new images before saving
  - Delete existing video
  - Upload replacement video
  - Preview new video before saving
- Batch operations on save:
  - Update project details
  - Delete marked images from Cloudinary
  - Upload new images
  - Delete old video
  - Upload new video
- Loading state during save
- Sticky media preview section

#### 11. **Multi-Image Management**
- Upload up to 20 images simultaneously
- Progress tracking during upload
- Individual image deletion from project
- Cloudinary integration for CDN delivery
- Automatic public_id extraction for deletion
- Grid preview in admin panel

#### 12. **Video Management**
- Single video per project
- Video upload with progress indication
- Auto-generated thumbnail
- Video duration tracking
- Replace video functionality
- Delete video with confirmation
- Cloudinary video CDN

---

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **File Upload**: Multer (memory storage)
- **Cloud Storage**: Cloudinary
- **Security**:
  - CORS
  - Cookie-parser
  - Express-validator
  - Express-rate-limit
- **Environment**: dotenv

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Markdown**: React-Markdown
- **Icons**: React Icons
- **Carousel**: Swiper

### Development Tools
- **Backend Dev Server**: Nodemon
- **Linting**: ESLint
- **Package Manager**: npm

---

## Project Structure

```
project-gallery-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # Admin auth logic
│   │   │   └── project.controller.js    # Project CRUD + media
│   │   ├── middlewares/
│   │   │   ├── auth.js                  # JWT verification
│   │   │   └── multer.js                # File upload config
│   │   ├── models/
│   │   │   ├── Admin.js                 # Admin schema
│   │   │   └── Project.js               # Project schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js           # Auth endpoints
│   │   │   └── project.routes.js        # Project endpoints
│   │   ├── services/
│   │   │   ├── cloudinary.js            # Cloudinary config
│   │   │   └── jwt.js                   # Token generation
│   │   ├── app.js                       # Express app setup
│   │   └── server.js                    # Server entry point
│   ├── .env.example                     # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png                 # Site logo
│   │   ├── components/
│   │   │   ├── AutoScrollDragSlider.jsx # Full-screen slider
│   │   │   ├── AutoSlider.jsx           # Thumbnail slider
│   │   │   └── ProtectedRoutes.jsx      # Auth guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Auth state management
│   │   ├── layout/
│   │   │   └── AdminLayout.jsx          # Admin sidebar layout
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx       # Dashboard with stats
│   │   │   ├── AdminLogin.jsx           # Login page
│   │   │   ├── AdminProjects.jsx        # Projects list
│   │   │   ├── CreateProject.jsx        # Create form
│   │   │   ├── EditProject.jsx          # Edit form
│   │   │   ├── ProjectDetail.jsx        # Public detail view
│   │   │   ├── PublicGallery.jsx        # Public gallery
│   │   │   └── SplashIntro.jsx          # Landing page
│   │   ├── services/
│   │   │   ├── api.js                   # Axios instance
│   │   │   └── projectApi.js            # API methods
│   │   ├── App.jsx                      # Route definitions
│   │   ├── index.css                    # Global styles
│   │   └── main.jsx                     # React entry point
│   ├── index.html                       # HTML template
│   ├── vercel.json                      # Vercel config
│   ├── vite.config.js                   # Vite config
│   └── package.json
│
└── README.md                            # This file
```

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Configuration](#configuration))

5. **Start development server**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/project-gallery
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend Configuration

Update `frontend/src/services/api.js` with your backend URL:

```javascript
export const api = axios.create({
  baseURL: "http://localhost:5000", // Change for production
  withCredentials: true,
});
```

### Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to backend `.env` file
4. Folders created automatically:
   - `project_images/` - for project images
   - `project_videos/` - for project videos

---

## Usage

### First Time Setup

1. **Register Admin Account**
   - Use API endpoint or manually create in MongoDB
   - POST to `/auth/register`
   - Body: `{ "email": "admin@example.com", "password": "yourpassword" }`

2. **Login to Admin Panel**
   - Navigate to `/admin/login`
   - Enter credentials
   - Redirects to dashboard on success

3. **Create First Project**
   - Click "Create New Project" in dashboard
   - Fill in project details
   - Upload images and video
   - Set visibility to "public"
   - Submit form

4. **View in Public Gallery**
   - Navigate to `/gallery`
   - See your published project
   - Click to view details

### Admin Workflow

#### Creating a Project
1. Go to `/admin/projects/new`
2. Fill in all required fields (Title, Summary)
3. Add optional fields (Description, Tech Stack, Tags, URLs, Year)
4. Upload images (max 20)
5. Upload video (optional, single file)
6. Select visibility (draft/public/private)
7. Preview media in right column
8. Click "Create Project"

#### Editing a Project
1. Go to `/admin/projects`
2. Click 3-dot menu on project card
3. Select "Edit"
4. Modify any fields
5. Manage images:
   - Hover over existing images and click "Remove"
   - Upload new images via file input
6. Manage video:
   - Click "Delete Existing Video" if needed
   - Upload new video via file input
7. Click "Save Changes"

#### Deleting a Project
1. Go to `/admin/projects`
2. Click 3-dot menu on project card
3. Select "Delete"
4. Confirm in modal
5. Project and all media deleted from Cloudinary

### Public User Workflow

#### Browsing Projects
1. Visit `/` (auto-redirects to `/gallery`)
2. Browse project cards
3. Click any project to view details

#### Searching Projects
1. **Text Search**:
   - Type in search bar
   - Filters by title and summary

2. **Tech Search**:
   - Click "Search by Tech" button
   - Type technology name
   - Select from dropdown
   - Add multiple techs
   - Remove tags by clicking "×"
   - Projects must match ALL selected techs

#### Viewing Project Details
1. Click project card in gallery
2. View images (auto-scrolling carousel)
3. Switch to video tab
4. Read full description (Markdown formatted)
5. Click GitHub or Live Demo buttons
6. View tech stack and tags
7. Check project metadata

---

## API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### Register Admin
```http
POST /auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "Admin registered successfully",
  "admin": "64f7a3b2c1234567890abcde"
}
```

#### Login Admin
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Sets HTTP-only cookie: accessToken
```

#### Check Auth Status
```http
GET /auth/check
Cookie: accessToken=<jwt-token>

Response: 200 OK
{
  "authenticated": true
}
```

### Project Endpoints

#### Get Public Projects
```http
GET /api/projects

Response: 200 OK
[
  {
    "_id": "64f7a3b2c1234567890abcde",
    "title": "E-commerce Platform",
    "summary": "Full-stack shopping site",
    "description": "Built with MERN stack...",
    "techStack": ["React", "Node.js", "MongoDB"],
    "tags": ["web", "fullstack"],
    "images": [
      { "url": "https://cloudinary.com/...", "alt": "Screenshot" }
    ],
    "video": {
      "url": "https://cloudinary.com/video.mp4",
      "thumbnail": "https://cloudinary.com/thumb.jpg",
      "title": "Demo",
      "duration": 120
    },
    "githubUrl": "https://github.com/user/repo",
    "liveUrl": "https://demo.com",
    "year": 2024,
    "visibility": "public",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get All Projects (Admin)
```http
GET /api/projects/all
Cookie: accessToken=<jwt-token>

Response: 200 OK
[
  // Includes public, private, and draft projects
]
```

#### Get Project by ID
```http
GET /api/projects/:id

Response: 200 OK
{
  // Single project object
}
```

#### Create Project (Admin)
```http
POST /api/projects
Cookie: accessToken=<jwt-token>
Content-Type: application/json

{
  "title": "New Project",
  "summary": "Brief description",
  "description": "# Markdown description",
  "techStack": "React,Node,MongoDB",  // Comma-separated
  "tags": "web,api",                  // Comma-separated
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "year": 2024,
  "visibility": "draft"
}

Response: 201 Created
{
  "_id": "...",
  "title": "New Project",
  // ... other fields
}
```

#### Update Project (Admin)
```http
PUT /api/projects/:id
Cookie: accessToken=<jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  // ... any fields to update
}

Response: 200 OK
{
  // Updated project object
}
```

#### Delete Project (Admin)
```http
DELETE /api/projects/:id
Cookie: accessToken=<jwt-token>

Response: 200 OK
{
  "message": "Project and media deleted successfully"
}
```

#### Upload Project Images (Admin)
```http
POST /api/projects/:id/images
Cookie: accessToken=<jwt-token>
Content-Type: multipart/form-data

Form Data:
- images: [file1, file2, ...] (max 20 files)

Response: 200 OK
{
  "message": "Images uploaded successfully",
  "images": [
    { "url": "https://...", "alt": "Project Image" }
  ],
  "project": { /* updated project */ }
}
```

#### Delete Project Image (Admin)
```http
DELETE /api/projects/:id/images
Cookie: accessToken=<jwt-token>
Content-Type: application/json

{
  "url": "https://cloudinary.com/image.jpg"
}

Response: 200 OK
{
  "message": "Image deleted successfully",
  "project": { /* updated project */ }
}
```

#### Upload Project Video (Admin)
```http
POST /api/projects/:id/video
Cookie: accessToken=<jwt-token>
Content-Type: multipart/form-data

Form Data:
- video: [video file]
- title: "Demo Video" (optional)

Response: 200 OK
{
  "message": "Video uploaded successfully",
  "video": {
    "url": "https://...",
    "thumbnail": "https://...",
    "title": "Demo Video",
    "duration": 120
  },
  "project": { /* updated project */ }
}
```

#### Delete Project Video (Admin)
```http
DELETE /api/projects/:id/video
Cookie: accessToken=<jwt-token>

Response: 200 OK
{
  "message": "Video deleted successfully",
  "project": { /* updated project */ }
}
```

---

## Frontend Routes

### Public Routes
- `/` - Splash intro page (auto-redirects to /gallery)
- `/gallery` - Public project gallery with search
- `/projects/:id` - Individual project detail page

### Admin Routes (Protected)
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard with stats
- `/admin/projects` - Projects management list
- `/admin/projects/new` - Create new project form
- `/admin/projects/:id/edit` - Edit project form

---

## Database Schema

### Admin Model
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,  // bcrypt hashed
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },
  timestamps: true  // createdAt, updatedAt
}
```

### Project Model
```javascript
{
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  techStack: [String],
  tags: [String],
  images: [
    {
      url: String,
      alt: String
    }
  ],
  video: {
    url: String,
    thumbnail: String,
    title: String,
    duration: Number
  },
  githubUrl: String,
  liveUrl: String,
  year: Number,
  visibility: {
    type: String,
    enum: ["public", "private", "draft"],
    default: "draft"
  },
  timestamps: true  // createdAt, updatedAt
}
```

---

## Authentication

### JWT Implementation
- Token generated on login
- Stored in HTTP-only cookie (secure, not accessible via JavaScript)
- Cookie settings:
  - `httpOnly: true`
  - `secure: false` (set to `true` in production with HTTPS)
  - `sameSite: "lax"`
  - `maxAge: 24 hours`

### Protected Route Flow
1. User attempts to access admin route
2. `ProtectedRoute` component checks `AuthContext`
3. If not authenticated, redirects to `/admin/login`
4. On successful login, JWT stored in cookie
5. All admin API requests include cookie automatically
6. Backend `requireAuth` middleware verifies JWT
7. If valid, request proceeds; if invalid, returns 401

### Session Persistence
- `AuthContext` verifies session on app load
- Calls `/auth/check` endpoint
- If cookie valid, user stays logged in
- If cookie expired/invalid, redirects to login

---

## Media Management

### Cloudinary Integration

#### Image Upload Process
1. User selects files in form
2. Files stored in component state
3. On form submit:
   - Project created in database
   - Files sent to backend via FormData
   - Multer processes files into memory
   - Each file uploaded to Cloudinary via `upload_stream`
   - Cloudinary returns secure URLs
   - URLs saved to project's `images` array in MongoDB

#### Image Deletion Process
1. User clicks delete on image
2. URL extracted from image
3. Public ID extracted from Cloudinary URL
4. Cloudinary API deletes image
5. MongoDB document updated to remove URL

#### Video Upload Process
1. User selects video file
2. File sent to backend
3. Uploaded to Cloudinary with `resource_type: "video"`
4. Cloudinary generates thumbnail automatically
5. Video object saved to project (URL, thumbnail, duration)

#### Video Deletion Process
1. User requests video deletion
2. Public ID extracted from video URL
3. Cloudinary API deletes video with `resource_type: "video"`
4. Video object removed from MongoDB document

### File Limits
- **Images**: Max 20 per upload (700MB total)
- **Video**: Single file (700MB limit)
- **Formats**: All standard web formats supported

---

## Deployment

### Backend Deployment (Render/Heroku)

1. **Prepare for production**
```bash
cd backend
npm run start  # Test production mode
```

2. **Environment variables**
   - Set all variables from `.env` in hosting platform
   - Update `CORS` origin in `app.js` to frontend URL
   - Set `secure: true` in cookie options for HTTPS

3. **Deploy**
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`

### Frontend Deployment (Vercel)

1. **Update API base URL**
```javascript
// src/services/api.js
export const api = axios.create({
  baseURL: "https://your-backend-url.com",
  withCredentials: true,
});
```

2. **Build and test locally**
```bash
cd frontend
npm run build
npm run preview
```

3. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Or connect GitHub repo in Vercel dashboard
   - `vercel.json` already configured for SPA routing

4. **Vercel Configuration** (already included)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Production Checklist
- [ ] Update CORS origins to production frontend URL
- [ ] Enable secure cookies (`secure: true`)
- [ ] Set strong JWT secret (min 32 characters)
- [ ] Use MongoDB Atlas for database
- [ ] Set Cloudinary environment variables
- [ ] Update API base URL in frontend
- [ ] Test all authentication flows
- [ ] Test image/video uploads
- [ ] Test all admin operations
- [ ] Verify public gallery access

---

## Features Summary

### Security
✅ JWT authentication with HTTP-only cookies
✅ Password hashing with bcryptjs
✅ Protected admin routes
✅ CORS configuration
✅ Rate limiting ready
✅ Input validation

### User Experience
✅ Smooth animations and transitions
✅ Responsive design (mobile-first)
✅ Loading states for async operations
✅ Delete confirmation modals
✅ Real-time form previews
✅ Auto-sliding carousels
✅ Drag-enabled image slider

### Content Management
✅ Rich text with Markdown support
✅ Multi-image upload
✅ Video upload with preview
✅ Tag system
✅ Tech stack categorization
✅ Visibility control (public/private/draft)

### Search & Discovery
✅ Text-based search
✅ Technology-based filtering
✅ Multi-select tech stack filter
✅ Real-time filtering

### Media Handling
✅ Cloudinary CDN integration
✅ Automatic image optimization
✅ Video thumbnail generation
✅ Batch image upload
✅ Individual image deletion
✅ Video replacement

---

**Built with ❤️ by Partha Borah**
