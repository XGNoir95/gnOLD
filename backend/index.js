const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

console.log(`MONGO_URI: ${process.env.MONGO_URI}`); // Log MONGO_URI

connectDB();

app.use(cors(
    {
      origin:["https://wanderhubfront-ten.vercel.app"],
      methods: ["POST","GET"],
      credentials: true
    }
));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send('Server is running');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
