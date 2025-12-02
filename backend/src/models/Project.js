import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    techStack: [{ type: String }],
    tags: [{ type: String }],
    images: [
        {
            url: String,
            alt: String,
        }
    ],
    githubUrl: {
        type: String,
    },
    liveUrl: {
        type: String,
    },
    year: {
        type: Number,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "draft"],
        default: "draft"
    }
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema);
export default Project;