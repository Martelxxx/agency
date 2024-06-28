import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setError('');
    }, [username, password, userType]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log('Submitting form with values:', { username, email, firstName, lastName, password, confirmPassword, userType });
            const res = await fetch('http://localhost:5010/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, firstName, lastName, password, confirmPassword, userType }),
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
                <h2>Create an Account</h2>
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
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
            <p>Already have an account? <a href='/login'>Log in</a></p>
            <p className='tinyTalk'>By creating an account you agree to the Terms of Use and have read our Privacy Policy. You understand Synapse Solutions and its affiliates may use your email address to provide updates, ads, and offers. You can opt out via the Privacy Policy.</p>
            </form>
        </div>
    );
}

export default SignUp;