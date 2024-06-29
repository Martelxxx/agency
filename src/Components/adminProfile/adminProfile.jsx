import React, { useState } from 'react';
import './adminProfile.css';

const createProject = async (event, setConfirmationMessage, setTotalCost, getRegion) => {
    event.preventDefault();
    const state = event.target.elements.projectState.value;
    const project = {
        projectOwner: event.target.elements.projectOwner.value,
        projectDescription: event.target.elements.projectDescription.value,
        projectManager: event.target.elements.projectManager.value,
        projectMembers: event.target.elements.projectMembers.value,
        projectStatus: event.target.elements.projectStatus.value,
        projectStartDate: new Date(event.target.elements.projectStartDate.value).toISOString(),
        projectEstimatedEndDate: new Date(event.target.elements.projectEstimatedEndDate.value).toISOString(),
        projectEndDate: new Date(event.target.elements.projectEndDate.value).toISOString(),
        projectCost: parseFloat(event.target.elements.projectCost.value),
        projectRegion: getRegion(state),
    };
    try {
        const response = await fetch('http://localhost:5010/api/project/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Project created:', data);
        setConfirmationMessage('Project created successfully!');
        setTimeout(() => setConfirmationMessage(''), 3000);
        setTotalCost(0); // Reset total cost
        event.target.reset(); // Reset the form
    } catch (err) {
        console.error('Error creating project:', err);
        setConfirmationMessage('Error creating project');
        setTimeout(() => setConfirmationMessage(''), 3000);
    }
};

const getRegion = (state) => {
    const regions = {
        "1": ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland"],
        "2": ["Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi"],
        "3": ["Ohio", "Michigan", "Indiana", "Illinois", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas"],
        "4": ["Arkansas", "Louisiana", "Texas", "Oklahoma"],
        "5": ["Montana", "Wyoming", "Colorado", "New Mexico", "Idaho", "Utah", "Nevada", "Arizona"],
        "6": ["Washington", "Oregon", "California", "Alaska", "Hawaii"]
    };

    for (let region in regions) {
        if (regions[region].includes(state)) {
            return region;
        }
    }
    return null;
};

const showProjects = async () => {
    try {
        const response = await fetch('http://localhost:5010/api/project/show');
        const data = await response.json();
        console.log('Projects retrieved:', data);
    } catch (err) {
        console.error('Error retrieving projects:', err);
    }
};

const updateProject = async (event) => {
    event.preventDefault();
    const id = 'project_id'; // Replace with the actual project ID
    const state = event.target.elements.projectState.value;
    const project = {
        projectOwner: event.target.elements.projectOwner.value,
        projectDescription: event.target.elements.projectDescription.value,
        projectManager: event.target.elements.projectManager.value,
        projectMembers: event.target.elements.projectMembers.value,
        projectStatus: event.target.elements.projectStatus.value,
        projectStartDate: new Date(event.target.elements.projectStartDate.value).toISOString(),
        projectEstimatedEndDate: new Date(event.target.elements.projectEstimatedEndDate.value).toISOString(),
        projectEndDate: new Date(event.target.elements.projectEndDate.value).toISOString(),
        projectCost: parseFloat(event.target.elements.projectCost.value),
        projectRegion: getRegion(state),
    };
    try {
        const response = await fetch(`http://localhost:5010/api/project/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
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

const deleteProject = async (event) => {
    event.preventDefault();
    const id = 'project_id'; // Replace with the actual project ID
    try {
        const response = await fetch(`http://localhost:5010/api/project/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Project deleted:', data);
    } catch (err) {
        console.error('Error deleting project:', err);
    }
};

const AdminProfile = ({ isLoggedIn }) => {
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [redesignPages, setRedesignPages] = useState(0);
    const [developmentPages, setDevelopmentPages] = useState(0);
    const [isRedesignChecked, setIsRedesignChecked] = useState(false);
    const [isDevelopmentChecked, setIsDevelopmentChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const cost = parseFloat(event.target.value);
        const isChecked = event.target.checked;

        if (event.target.name === 'redesign') {
            setIsRedesignChecked(isChecked);
            setTotalCost(prevCost => isChecked ? prevCost + cost + (redesignPages * 10) : prevCost - cost - (redesignPages * 10));
        } else if (event.target.name === 'development') {
            setIsDevelopmentChecked(isChecked);
            setTotalCost(prevCost => isChecked ? prevCost + cost + (developmentPages * 50) : prevCost - cost - (developmentPages * 50));
        } else {
            setTotalCost(prevCost => isChecked ? prevCost + cost : prevCost - cost);
        }
    };

    const handleRedesignPagesChange = (event) => {
        const pages = parseInt(event.target.value);
        setTotalCost(prevCost => prevCost + (pages * 10) - (redesignPages * 10));
        setRedesignPages(pages);
    };

    const handleDevelopmentPagesChange = (event) => {
        const pages = parseInt(event.target.value);
        setTotalCost(prevCost => prevCost + (pages * 50) - (developmentPages * 50));
        setDevelopmentPages(pages);
    };

    if (!isLoggedIn) {
        return <div>Please log in to access this page.</div>;
    }

    return (
        <div className="adminProfile">
            <h2>Admin Profile</h2>
            <form onSubmit={(event) => createProject(event, setConfirmationMessage, setTotalCost, getRegion)}>
                <select name="projectState">
                    <option value="">Select State</option>
                    {["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"].map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                <input type="text" name="projectOwner" placeholder="Project Owner" />
                <input type="text" name="projectDescription" placeholder="Project Description" />
                <input type="text" name="projectManager" placeholder="Project Manager" />
                <input type="text" name="projectMembers" placeholder="Project Members" />
                <input type="text" name="projectStatus" placeholder="Project Status" />
                <input type="date" name="projectStartDate" placeholder="Project Start Date" />
                <input type="date" name="projectEstimatedEndDate" placeholder="Project Estimated End Date" />
                <input type="date" name="projectEndDate" placeholder="Project End Date" />
                
                <div className="costOptions">
                    <div className='maintenanceCost'><h2>Monthly Maintenance Cost:</h2>
                        <label>
                            <input type="checkbox" value="50" onChange={handleCheckboxChange} /> Basic ($50)
                        </label>
                        <label>
                            <input type="checkbox" value="200" onChange={handleCheckboxChange} /> Standard ($200)
                        </label>
                        <label>
                            <input type="checkbox" value="400" onChange={handleCheckboxChange} /> Premium ($400)
                        </label>
                    </div>
<hr></hr>
                    <div className='developmentCost'><h2>Development Cost:</h2>
                        <label>
                            <input type="checkbox" name="redesign" value="175" onChange={handleCheckboxChange} /> Website Redesign ($175 + $10 per page added)
                        </label>
                        <select onChange={handleRedesignPagesChange} disabled={!isRedesignChecked}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <label>
                            <input type="checkbox" name="development" value="325" onChange={handleCheckboxChange} /> Website Development ($325 for first 5 pages + $50 per additional page)
                        </label>
                        <select onChange={handleDevelopmentPagesChange} disabled={!isDevelopmentChecked}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <hr></hr>
                    <div className='extrasCost'><h2>Extras:</h2>
                        <label>
                            <input type="checkbox" value="60" onChange={handleCheckboxChange} /> Logo Design ($60)
                        </label>
                        <label>
                            <input type="checkbox" value="15" onChange={handleCheckboxChange} /> Private Database ($15)
                        </label>
                    </div>
                </div>

                <input type="hidden" name="projectCost" value={totalCost} />
                <div className="totalCost">Total Cost: ${totalCost}</div>
                <button type="submit">Create project</button>
            </form>
            {confirmationMessage && <div className="confirmationMessage">{confirmationMessage}</div>}
            <div className="action-buttons">
                <button onClick={showProjects}>Show projects</button>
            </div>
            <form onSubmit={updateProject}>
                <input type="text" name="projectOwner" placeholder="Project Owner" />
                <input type="text" name="projectDescription" placeholder="Project Description" />
                <input type="text" name="projectManager" placeholder="Project Manager" />
                <input type="text" name="projectMembers" placeholder="Project Members" />
                <input type="text" name="projectStatus" placeholder="Project Status" />
                <input type="date" name="projectStartDate" placeholder="Project Start Date" />
                <input type="date" name="projectEstimatedEndDate" placeholder="Project Estimated End Date" />
                <input type="date" name="projectEndDate" placeholder="Project End Date" />
                <button type="submit">Update project</button>
            </form>
            <form onSubmit={deleteProject}>
                <button type="submit">Delete project</button>
            </form>
        </div>
    );
};

export default AdminProfile;