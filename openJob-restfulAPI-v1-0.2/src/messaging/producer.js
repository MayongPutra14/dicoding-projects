import { getChannel } from "../config/rabbitmq.js";

export const producerApplicationEvent = async (data) => {
  try {
    const channel = getChannel();

    channel.sendToQueue(
      "application:created",
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
    );
    console.log("Message sent to RabbitMQ");
  } catch (error) {
    console.error(
      "Messaging Error: failed sent message to RAbbitMQ.",
      error.message,
    );
  }
};
