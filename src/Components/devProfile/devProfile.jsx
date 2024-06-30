import React, { useState, useEffect } from 'react';
import './devProfile.css';

function DevProfile({ user, onRegionUpdate, updateProjectStatus }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (user && user.region) {
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
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleUpdateProjectStatus = async (projectId, currentStatus) => {
        const newStatus = currentStatus === 'In Progress' ? 'Completed' : 'In Progress';
        await updateProjectStatus(projectId, newStatus);
        setProjects(prevProjects => prevProjects.map(project => 
            project._id === projectId ? { ...project, projectStatus: newStatus } : project
        ));
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
                            <div className="projectDetails">
                                <h3>Company Profile: {project.projectOwner}</h3>
                                <p><strong>Project Description:</strong> {project.projectDescription}</p>
                                <p><strong>Status:</strong> {project.projectStatus}</p>
                                <p><strong>Date Added:</strong> {new Date(project.projectStartDate).toLocaleDateString()}</p>
                                <p><strong>Expected End Date:</strong> {new Date(project.projectEstimatedEndDate).toLocaleDateString()}</p>
                                <p><strong>Region:</strong> {project.projectRegion}</p>
                            </div>
                            <div className="projectActions">
                                <button 
                                    onClick={() => handleUpdateProjectStatus(project._id, project.projectStatus)}>
                                    {project.projectStatus === 'In Progress' ? 'Mark as Completed' : 'Accept Project'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DevProfile;
