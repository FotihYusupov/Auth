const { verify } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const userId = verify(token, process.env.SECRET_KEY);
    if (userId) {
      req.headers.userId = userId;
      next();
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'Token is not defined',
    });
  }
}

module.exports = authMiddleware;
