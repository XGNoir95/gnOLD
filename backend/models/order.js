const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    game:{
        type: mongoose.Types.ObjectId,
        ref: "games",
    },
    status:{
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"]
    },
},{timestamps: true}
);
module.exports = mongoose.model("order", order);