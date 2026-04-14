const express = require('express');
const app = express();
const connectDB = require("./config/mongoose");
const dotenv = require("dotenv");
const router = require('./routes/todo');
dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use("/api/v1/todos", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});