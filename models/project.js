import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectOwner: { type: String, required: false },
    projectDescription: { type: String, required: false },
    projectManager: { type: String, required: false },
    projectMembers: { type: String, required: false },
    projectStatus: { type: String, required: false },
    projectStartDate: { type: Date, required: false },
    projectEstimatedEndDate: { type: Date, required: false },
    projectEndDate: { type: Date, required: false },
    projectCost: { type: Number, required: false },
    projectRegion: { type: String, required: false },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
