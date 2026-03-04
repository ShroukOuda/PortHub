const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');
const Portfolio = require('../models/Portfolio');

// Helper: delete old file from disk
const deleteOldFile = (filePath) => {
    if (!filePath || filePath === 'default-project-image.png') return;
    const fullPath = path.join(__dirname, '..', filePath);
    fs.unlink(fullPath, (err) => {
        if (err && err.code !== 'ENOENT') console.error('Failed to delete old file:', fullPath, err.message);
    });
};

// Get current user's projects
const getMyProjects = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const projects = await Project.find({ portfolioId: portfolio._id });
        res.status(200).json({ data: projects });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

const createProject = async (req, res) => {
    const { title, description, technologies, images, image, demoUrl, githubUrl, featured } = req.body;
    let { portfolioId } = req.body;

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const newProject = new Project({
            portfolioId,
            title,
            description,
            technologies,
            image,
            demoUrl,
            githubUrl,
            featured
        });

        const savedProject = await newProject.save();
        res.status(201).json({ data: savedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
}
const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, technologies, images, image, demoUrl, githubUrl, featured } = req.body;

    try {
        // Delete old image if a new one is provided
        if (image) {
            const existingProject = await Project.findById(projectId);
            if (existingProject && existingProject.image && existingProject.image !== image) {
                deleteOldFile(existingProject.image);
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            title,
            description,
            technologies,
            images,
            image,
            demoUrl,
            githubUrl,
            featured
        }, { new: true });
        res.status(200).json({ data: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
}

const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Delete image file before removing from DB
        const project = await Project.findById(projectId);
        if (project && project.image) {
            deleteOldFile(project.image);
        }

        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
}

const getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId).populate('portfolioId', 'title');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
}

const getAllProjectsByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const projects = await Project.find({ portfolioId });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjectsByPortfolioId,
    getMyProjects
};


