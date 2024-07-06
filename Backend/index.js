import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRouter from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("MongoDB connection failed: " + err.message);
    }
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/reviews", reviewRouter);


app.get("/", (req, res) => {
    res.send("App is working");
});

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port ' + port);
});
