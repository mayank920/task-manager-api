require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());  //middleware to pass json data
app.use(cors());
console.log("MONGODB_URI", process.env.MONGO_URI)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

//Use Routes
const taskRoutes = require("./routes/tasks");
app.use("/api", taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));