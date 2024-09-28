import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { useremail, password, retypePassword } = req.body;

    // check if password is the same as retype password
    if (password !== retypePassword) {
        return res.status(400).json({success: false, message: 'Passwords do not match'});
    }

    try {
        const existingUser = await User.findByEmail(useremail);
        if (existingUser) {
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        await User.create(useremail, password);
        res.status(201).json({success: true, message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error'});
    }
};

export const signin = async (req, res) => {
    const { useremail, password } = req.body;

    try {
        const user = await User.findByEmail(useremail);
        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        // Issue a token (jwt)

        const token = jwt.sign({id: user.id, useremail: user.useremail}, 'your_jwt_secret', { expiresIn: '1h'});

        res.status(200).json({success: true, token });
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error'});
    }
};
