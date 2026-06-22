const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => { try { const token = req.headers.authorization.split(" ")[1]; const decoded = jwt.verify(token, "SUPER_SECRET_KEY"); req.userData = decoded; next(); } catch (error) { return res.status(401).json({ error: "Authentication failed. Missing or invalid token." }); } };
