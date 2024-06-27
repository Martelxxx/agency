import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const SignIn = () => {
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
                navigate('/');
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
            </form>
        </div>
    );
}

export default SignIn;