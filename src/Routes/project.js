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
router.get("/show", async (req, res) => {
    try {
        const projects = await Project.find();
        console.log('Projects retrieved successfully:', projects);
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error retrieving projects:', err);
        res.status(500).json(err);
    }
});

// Update an existing project
router.put("/update/:id", async (req, res) => {
    const { projectOwner, projectDescription, projectManager, projectMembers, projectStatus, projectStartDate, projectEstimatedEndDate, projectEndDate, projectCost, projectRegion } = req.body;

    console.log('Received project update request with body:', req.body);

    if (!projectOwner || !projectDescription || !projectManager || !projectMembers || !projectStatus || !projectStartDate || !projectEstimatedEndDate || !projectEndDate || !projectCost || !projectRegion) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            {
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
            },
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


// Delete an existing project
router.delete("/delete/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        console.log('Project deleted successfully');
        res.status(200).json('Project deleted successfully');
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json(err);
    }
});

export default router;