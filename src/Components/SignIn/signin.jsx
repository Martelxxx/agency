import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const SignIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log('Submitting form with values:', { username, password });
            const res = await fetch('http://localhost:5010/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) { // Check if status code is in the range 200-299
                const data = await res.json();
                console.log('User logged in successfully:', data);
                onLogin(username); // Call onLogin with the username
                navigate('/'); // Navigate to the home page
            } else {
                const errorData = await res.json(); // Assuming the server sends JSON with error details
                console.error('Error from server:', errorData);
                setError(errorData.message || 'Unknown error occurred');
            }
        } catch (err) {
            console.error('Failed to log in user:', err);
            setError('Failed to log in user');
        }
    };

    return (
        <div className="signin">
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
                {error && <p className="error">{error}</p>}
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
                <p className='tinyTalk'>By creating an account you agree to the Terms of Use and have read our Privacy Policy. You understand Synapse Solutions and its affiliates may use your email address to provide updates, ads, and offers. You can opt out via the Privacy Policy.</p>
            </form>
        </div>
    );
}

export default SignIn;
