import "dotenv/config";
import express from "express";
import pool from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js ";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { runApplicationConsumer } from "./messaging/consumer.js";

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
app.use(companyRoutes);
app.use(categoryRoutes);
app.use(jobRoutes);
app.use(applicationRoutes);
app.use(bookmarkRoutes);
app.use(profileRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "DB Connected",
      time: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "DB Error",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

const start = async () => {
  try {
    await connectRabbitMQ();

    app.listen(PORT, () => {
      console.log(`Server is running at http://${HOST}:${PORT}`);
    });
    runApplicationConsumer();
  } catch (error) {
    console.error("Startup Error: ", error.message);
  }
};

start();
