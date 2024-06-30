import express from "express";
import Project from "../../models/project.js";

const router = express.Router();

// Create a new project
router.post("/create", async (req, res) => {
    const { projectOwner, projectDescription, projectManager, projectMembers, projectStatus, projectStartDate, projectEstimatedEndDate, projectEndDate, projectCost, projectRegion } = req.body;

    console.log('Received project creation request with body:', req.body);

    if (!projectOwner || !projectDescription || !projectManager || !projectMembers || !projectStatus || !projectStartDate || !projectEstimatedEndDate || !projectEndDate || !projectCost || !projectRegion) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProject = new Project({
            projectOwner,
            projectDescription,
            projectManager,
            projectMembers,
            projectStatus,
            projectStartDate,
            projectEstimatedEndDate,
            projectEndDate,
            projectCost,
            projectRegion,
        });

        const project = await newProject.save();
        console.log('Project created successfully:', project);
        res.status(201).json(project);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json(err);
    }
});

// Show all existing projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        console.log('Projects retrieved successfully:', projects);
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error retrieving projects:', err);
        res.status(500).json(err);
    }
});

// Show all existing projects or filtered by query parameters
router.get("/show", async (req, res) => {
    try {
        const { searchTerm, status } = req.query;

        let filter = {};
        if (searchTerm) {
            filter.projectOwner = new RegExp(searchTerm, 'i'); // Case-insensitive search
        }
        if (status) {
            filter.projectStatus = { $in: status.split(',') }; // Expecting a comma-separated list of statuses
        }

        const projects = await Project.find(filter);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving projects', error: err });
    }
});

// Update an existing project
router.put("/update/:id", async (req, res) => {
    const updateData = req.body;

    console.log('Received project update request with body:', req.body);

    if (!updateData || Object.keys(updateData).length === 0) {
        console.log('No update data provided');
        return res.status(400).json({ message: 'No update data provided' });
    }

    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateData },
            { new: true }
        );

        console.log('Project updated successfully:', project);
        res.status(200).json(project);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json(err);
    }
}); 

// Get by region
router.get('/region/:region', async (req, res) => {
    const { region } = req.params;
    try {
        const projects = await Project.find({ projectRegion: region });
        console.log(`Projects in region ${region}:`, projects);
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: 'Error fetching projects', error: err });
    }
});

// Delete a project
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ message: 'Error deleting project', error: err });
    }
});

export default router;