require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());  //middleware to pass json data
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/taskmanager",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

//Use Routes
const taskRoutes = require("./routes/tasks");
app.use("/api", taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));