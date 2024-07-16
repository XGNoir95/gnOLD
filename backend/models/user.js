const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "games",
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "games",
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        }
    ],
},{ timestamps: true}
);
module.exports = mongoose.model("user",user);