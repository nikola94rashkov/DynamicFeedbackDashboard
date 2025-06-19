const User = require('../models/User');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            ...req.body,
            password,
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { id: savedUser.id, email: savedUser.email, role: savedUser.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log(`Login attempt for user: ${email}`);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.userId = user._id;
        res.status(200).json({ message: 'Login successful', user: { _id: user._id, role: user.role } });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = { registerUser, loginUser, logoutUser };