const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  // Check for authorization header and confirm Bearer token format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    // Attach mock user details (normally you would query your DB: User.findById(decoded.id))
    req.user = {
      id: decoded.id,
      name: 'Arnold Orina',
      email: 'orinaarnold886@gmail.com',
      role: 'developer'
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Invalid or expired authentication token.'
    });
  }
};
