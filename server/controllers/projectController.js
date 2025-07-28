const Project = require('../models/Project');


const createProject = async (req, res) => {
    const { portfolioId, title, description, technologies, images, demoUrl, githubUrl, featured } = req.body;

    try {
        const newProject = new Project({
            portfolioId,
            title,
            description,
            technologies,
            images,
            demoUrl,
            githubUrl,
            featured
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
}
const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, technologies, images, demoUrl, githubUrl, featured } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            title,
            description,
            technologies,
            images,
            demoUrl,
            githubUrl,
            featured
        }, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
}

const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
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
    getAllProjectsByPortfolioId
};


