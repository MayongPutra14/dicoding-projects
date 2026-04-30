import { getChannel } from "../config/rabbitmq.js";

export const producerApplicationEvent = async (data) => {
  try {
    const channel = getChannel(); // Jika gagal, ini akan melempar error

    channel.sendToQueue(
      "application:created",
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    console.log("Message sent to RabbitMQ");
  } catch (error) {
    // Kita tangkap errornya di sini agar tidak meledak ke Service/Controller
    console.error("Messaging Error: Gagal mengirim pesan ke RabbitMQ, tapi API tetap lanjut.", error.message);
  }
};