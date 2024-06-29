import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/agencyLogo.png';
import './signup.css';

const regions = {
    "1": ["Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland"],
    "2": ["Virginia", "West Virginia", "North Carolina", "South Carolina", "Georgia", "Florida", "Kentucky", "Tennessee", "Alabama", "Mississippi"],
    "3": ["Ohio", "Michigan", "Indiana", "Illinois", "Wisconsin", "Minnesota", "Iowa", "Missouri", "North Dakota", "South Dakota", "Nebraska", "Kansas"],
    "4": ["Arkansas", "Louisiana", "Texas", "Oklahoma"],
    "5": ["Montana", "Wyoming", "Colorado", "New Mexico", "Idaho", "Utah", "Nevada", "Arizona"],
    "6": ["Washington", "Oregon", "California", "Alaska", "Hawaii"]
};

const getRegion = (state) => {
    for (let region in regions) {
        if (regions[region].includes(state)) {
            return region;
        }
    }
    return null;
};

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, setState] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setError('');
    }, [username, password, userType]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const region = getRegion(state);
    
        try {
            console.log('Submitting form with values:', { username, email, firstName, lastName, password, confirmPassword, userType, region });
            const res = await fetch('http://localhost:5010/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, firstName, lastName, password, confirmPassword, userType, region }),
            });
        
            if (res.ok) { // Check if status code is in the range 200-299
                const data = await res.json();
                console.log('User registered successfully:', data);
                navigate('/');
            } else {
                const errorData = await res.json(); // Assuming the server sends JSON with error details
                console.error('Error from server:', errorData);
                setError(errorData.message || 'Unknown error occurred');
            }
        } catch (err) {
            console.error('Failed to register user:', err);
            setError('Failed to register user');
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
            <img className="logo1" src={ logo } />
                <h2>Create an Account</h2>
                <p>Already have an account? <a href='/login'>Log in</a></p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <select value={userType} onChange={(event) => setUserType(event.target.value)}>
                    <option value="" disabled selected>Select User Type</option>
                    <option value="user">Developer</option>
                    <option value="admin">Admin</option>
                    </select>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="" disabled>Select State</option>
                    {Object.values(regions).flat().map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
            <p className='tinyTalk'>By creating an account you agree to the Terms of Use and have read our Privacy Policy. You understand Synapse Solutions and its affiliates may use your email address to provide updates, ads, and offers. You can opt out via the Privacy Policy.</p>
            </form>
        </div>
    );
}

export default SignUp;