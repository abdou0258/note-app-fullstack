const express = require("express");
require("dotenv").config();
require('express-async-errors');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./db/db");
const tasksRouter = require("./routes/todo");
const authRouter = require('./routes/auth')
app.use(express.json());
//error handling
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/auth')
//security
const cors = require('cors')
app.use(cors())






// Serve static files from the 'Frontend' directory
app.use(express.static("../Frontend"));

// API routes
app.use('/auth',authRouter)
app.use("/api", authMiddleware,tasksRouter);
//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
