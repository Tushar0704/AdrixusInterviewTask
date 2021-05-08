require('dotenv').config({path: "./config.env"});
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// connect db
connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//Error Handeler should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})