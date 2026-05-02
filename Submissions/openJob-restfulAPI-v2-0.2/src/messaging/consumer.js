import { getChannel } from "../config/rabbitmq.js";
import nodemailer from "nodemailer";
import { getApplicationDetailForEmail } from "../services/repositories/applicationRepositories.js";

export const runApplicationConsumer = async () => {
  const channel = getChannel();
  const queueName = "application:created";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  channel.consume(queueName, async (message) => {
    if (message !== null) {
      try {
        const content = JSON.parse(message.content.toString());
        const { application_id } = content
        const detail = await getApplicationDetailForEmail(application_id);

        if (detail) {
          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: detail.owner_email,
            subject: `New Application Notifcation: ${detail.job_title}`,
            text: `Applicant: ${detail.application_name} (${detail.application_email}\nTanngal: ${detail.created_at})`,
          });
          console.log(`Email sent to owner: ${detail.owner_email}`);
        }
        channel.ack(message);
      } catch (error) {
        console.error("Consumer Prcessing Error", error.message);
      }
    }
  });
};
