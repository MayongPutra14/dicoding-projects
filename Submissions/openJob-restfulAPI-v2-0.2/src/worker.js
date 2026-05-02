import "dotenv/config";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { runApplicationConsumer } from "./messaging/consumer.js";

const startWorker = async () => {
  try {
    await connectRabbitMQ();
    await runApplicationConsumer();
    console.log("Worker Email Notification is Running...");
  } catch (error) {
    console.error("Worker Error: ", error.message);
  }
};

startWorker();
