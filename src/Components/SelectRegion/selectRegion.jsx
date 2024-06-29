import React, { useState } from 'react';
import './selectRegion.css';

    const regions = {
        "New England and Mid-Atlantic": ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland"],
        "Southeast": ["Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi"],
        "Midwest": ["Ohio", "Michigan", "Indiana", "Illinois", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas"],
        "South-Central": ["Arkansas", "Louisiana", "Texas", "Oklahoma"],
        "Mountain": ["Montana", "Wyoming", "Colorado", "New Mexico", "Idaho", "Utah", "Nevada", "Arizona"],
        "Pacific": ["Washington", "Oregon", "California", "Alaska", "Hawaii"]
    };
    
    const SelectRegion = ({ onRegionSelect }) => {
        const [selectedRegion, setSelectedRegion] = useState('');
    
        const handleSubmit = (event) => {
            event.preventDefault();
            if (selectedRegion) {
                onRegionSelect(selectedRegion);
            }
        };
    
        return (
            <div className="select-region-container">
                <form onSubmit={handleSubmit} className="select-region-form">
                    <h2>Select Your Region</h2>
                    <select onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion}>
                        <option value="">Select Region</option>
                        <option value="1">New England and Mid-Atlantic</option>
                        <option value="2">Southeast</option>
                        <option value="3">Midwest</option>
                        <option value="4">South-Central</option>
                        <option value="5">Mountain</option>
                        <option value="6">Pacific</option>
                    </select>
                    <button type="submit">Save Region</button>
                </form>
                <table className="region-table">
                    <thead>
                        <tr>
                            <th>Region</th>
                            <th>States</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(regions).map(([region, states]) => (
                            <tr key={region}>
                                <td>{region}</td>
                                <td>{states.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
};

export default SelectRegion;
