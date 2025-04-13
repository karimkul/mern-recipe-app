const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password  is required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    // { expiresIn: '1hr', }

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (err) {
    console.error('Error in userSignUp:', err.message);

    return res.status(500).json({ message: 'Server error' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password  is required!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User  not found!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1hr',
      }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error('Error in userSignUp:', err.message);

    return res.status(500).json({ message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    console.error('Error in getUser:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { userLogin, userSignUp, getUser };
