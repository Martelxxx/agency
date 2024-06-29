import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const UpdateProject = () => {
    const { state } = useLocation();
    // const { project } = state;

    const [projectDetails, setProjectDetails] = useState(project);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails({
            ...projectDetails,
            [name]: value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5010/api/project/update/${project._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectDetails),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Project updated:', data);
        } catch (err) {
            console.error('Error updating project:', err);
        }
    };

    return (
        <div className="updateProject">
            <h2>Update Project</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="projectOwner"
                    value={projectDetails.projectOwner}
                    onChange={handleInputChange}
                    placeholder="Project Owner"
                />
                <input
                    type="text"
                    name="projectDescription"
                    value={projectDetails.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Project Description"
                />
                <input
                    type="text"
                    name="projectManager"
                    value={projectDetails.projectManager}
                    onChange={handleInputChange}
                    placeholder="Project Manager"
                />
                <input
                    type="text"
                    name="projectMembers"
                    value={projectDetails.projectMembers}
                    onChange={handleInputChange}
                    placeholder="Project Members"
                />
                <input
                    type="text"
                    name="projectStatus"
                    value={projectDetails.projectStatus}
                    onChange={handleInputChange}
                    placeholder="Project Status"
                />
                <input
                    type="date"
                    name="projectStartDate"
                    value={new Date(projectDetails.projectStartDate).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    placeholder="Project Start Date"
                />
                <input
                    type="date"
                    name="projectEstimatedEndDate"
                    value={new Date(projectDetails.projectEstimatedEndDate).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    placeholder="Project Estimated End Date"
                />
                <input
                    type="date"
                    name="projectEndDate"
                    value={new Date(projectDetails.projectEndDate).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    placeholder="Project End Date"
                />
                <input
                    type="number"
                    name="projectCost"
                    value={projectDetails.projectCost}
                    onChange={handleInputChange}
                    placeholder="Project Cost"
                />
                <button type="submit">Update Project</button>
            </form>
        </div>
    );
};

export default UpdateProject;
