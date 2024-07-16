const jwt = require("jsonwebtoken");

const JWT_SECRET = "gameStore123";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        console.log("Token is missing");
        return res.status(401).json({ message: "Token is required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Token expired or invalid. Please sign in again" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
