import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";

const smtp = {
  user: process.env.SMTP_USER as string,
  pass: process.env.SMTP_PASS as string,
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  service: process.env.SMTP_SERVICE as string,
};

const transporter = nodemailer.createTransport({
  service: smtp.service,
  host: smtp.host,
  port: smtp.port,
  secure: smtp.secure,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  try {
    const info = await transporter.sendMail(payload);
    log.info(`Email sent: ${info.messageId}`);
    if (nodemailer.getTestMessageUrl(info)) {
      log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (error) {
    log.error(error, "Error sending email");
    throw new Error("Email sending failed");
  }
}

export default sendEmail;
