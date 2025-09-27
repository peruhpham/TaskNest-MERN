const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
