import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Or check in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    console.log('Auth middleware - Token exists:', !!token); // Debug

    if (!token) {
      console.log('No token provided'); // Debug
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded); // Debug
    } catch (err) {
      console.error('Token verification failed:', err.message); // Debug
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
    
    // Get user from token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      console.log('User not found for ID:', decoded.id); // Debug
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated:', user.username); // Debug

    // Attach sanitized user to request (without password)
    req.user = User.sanitizeUser(user);
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Debug
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};