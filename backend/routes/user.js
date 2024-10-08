const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

const JWT_SECRET = "gameStore123";
const JWT_REFRESH_SECRET = "your_jwt_refresh_secret";

// Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check if username length is more than 4
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be at least 4 characters long" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password's length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length should be greater than 5" });
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });

        await newUser.save();
        return res.status(200).json({ message: "SignUp Successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const authClaims = [
            { name: existingUser.username },
            { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, JWT_SECRET, { expiresIn: "59m" });
        const refreshToken = jwt.sign({ authClaims }, JWT_REFRESH_SECRET, { expiresIn: "1d" });

        res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
            refreshToken: refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Refresh Token
router.post("/token", (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token is required" });

    jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });
        const newAccessToken = jwt.sign({ authClaims: user.authClaims }, JWT_SECRET, { expiresIn: "20m" });
        res.json({ accessToken: newAccessToken });
    });
});

// Get user info
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Update user-info
router.put("/update-profile", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { username, email, address, avatar } = req.body;

        // Check if username length is more than 4
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be at least 4 characters long" });
        }

        // Check if email already exists and it's not the current user's email
        const existingEmail = await User.findOne({ email: email });
        const currentUser = await User.findById(id);
        if (existingEmail && existingEmail.email !== currentUser.email) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await User.findByIdAndUpdate(id, { username, email, address, avatar });
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
