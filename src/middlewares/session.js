const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        req.user = decoded;
        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token has expired.' });
        } else {
          return res.status(403).json({ error: 'Invalid token.' });
        }
      }
  } catch {
    console.log("token invalido o fallaron");
    return next({ status: 403, message: "Permission denied" });
  }
};

module.exports = authenticateToken;
