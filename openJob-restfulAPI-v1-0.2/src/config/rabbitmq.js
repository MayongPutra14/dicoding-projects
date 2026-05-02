import amqp from "amqplib";

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });
    channel = await connection.createChannel();

    await channel.assertQueue("application:created", {
      durable: true,
    });

    console.log("RabbitMQ Connected Succesfully");
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
