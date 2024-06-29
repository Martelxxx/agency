// devProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './devProfile.css';

function DevProfile({ user, onRegionUpdate, updateProjectStatus }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (user && user.region) {
            console.log('Fetching projects for region:', user.region);
            fetchProjectsByRegion(user.region);
        }
    }, [user]);

    const fetchProjectsByRegion = async (region) => {
        try {
            const response = await fetch(`http://localhost:5010/api/project/region/${region}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Projects fetched:', data);
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleAcceptProject = async (projectId) => {
        await updateProjectStatus(projectId, 'In Progress');
    };

    return (
        <div className="devProfile">
            <h2>Developer Profile</h2>
            <div className="projectList">
                {projects.length === 0 ? (
                    <p>No projects available in your region.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className="projectItem">
                            <h2>Company Profile: {project.projectOwner}</h2>
                            <p>Project Description: {project.projectDescription}</p>
                            <p>Status: {project.projectStatus}</p>
                            <p>Start Date: {new Date(project.projectStartDate).toLocaleDateString()}</p>
                            <p>Estimated End Date: {new Date(project.projectEstimatedEndDate).toLocaleDateString()}</p>
                            <p>Cost: ${project.projectCost}</p>
                            <p>Region: {project.projectRegion}</p>
                            <button onClick={() => handleAcceptProject(project._id)}>Accept Project</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DevProfile;
