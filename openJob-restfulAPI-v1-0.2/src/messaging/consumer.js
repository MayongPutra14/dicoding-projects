import { getChannel } from "../config/rabbitmq.js";

export const runApplicationConsumer = async () => {
  const channel = getChannel();
  const queueName = "application:created";

  channel.consume(queueName, async (message) => {
    if (message !== null) {
      try {
        const content = JSON.parse(message.content.toString());
        console.log("Message Recieved: ", content);
        channel.ack(message);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
