const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Games = require("./routes/game");
const Favourites = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors({
    origin: ["https://gn-oldapi.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Root route
app.get("/", (req, res) => {
    res.send('Server is running');
});

// Route handling
app.use("/api/v1", User);
app.use("/api/v1", Games);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Catch-all handler to send back index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
