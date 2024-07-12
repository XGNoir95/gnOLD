const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Games = require("./routes/game");
const Favourites = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors({
    origin: ["https://gn-old-front.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send('Server is running');
});

//route handling
app.use("/api/v1", User);
app.use("/api/v1", Games);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//creating Port
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
