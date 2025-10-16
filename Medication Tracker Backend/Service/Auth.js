const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";

exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.user = decoded; // decoded payload (username, role, etc.)
    next();
  });
};
