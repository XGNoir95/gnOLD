const express = require("express");
const app =  express();

require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const User = require("./routes/user");
const Games = require("./routes/game");
const Favourites = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(express.json());
app.use(cors());
//route handling
app.use("/api/v1", User);
app.use("/api/v1", Games);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//creating Port
app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`);
});