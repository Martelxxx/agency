import express from 'express';
import User from '../../models/user.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, firstName, lastName, password, confirmPassword, userType, region } = req.body;

    console.log('Received registration request with body:', req.body);

    if (!username || !email || !firstName || !lastName || !password || !confirmPassword || !userType) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log('Username or email already exists:', { username, email });
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            userType,
            region,
        });

        const user = await newUser.save();
        console.log('User registered successfully:', user);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json(err);
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Wrong username or password!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong username or password!");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update region of a user
router.put('/updateRegion/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json("User not found!");
        }

        await User.findByIdAndUpdate(req.params.id, { $set: { region: req.body.region } });
        res.status(200).json("Region has been updated!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


// Logout a user
router.post('/logout', (req, res) => {
    res.status(200).json("User has been logged out.");
});

export default router;
