import amqp from "amqplib";

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertQueue("application:created", {
      durable: true,
    });
  } catch (error) {
    console.error("RabbitMQ connection failed: ", error.message);
  }
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized.");
  }
  return channel;
};
