const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patienRoutes");
const consultantRoutes = require("./routes/consultantRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());


// Cors middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// MongoDB connection
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });



app.use("/api", patientRoutes, consultantRoutes);