const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({error: 'Access denied'});
  try {
    //const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error, ' error');
    res.status(401).json({error: 'Invalid token'});
  }
}

module.exports = verifyToken;
