import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { URL } from "url";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;
  const __dirname = new URL(".", import.meta.url).pathname;

  const templatePath = path.join(__dirname, "../mails", template);

  try {
    // Asynchronously render the email template
    const html1 = await ejs.renderFile(
      "D:/MERNPRACTICS/webBlogs/server/src/mails/activation-mail.ejs",
      data
    );

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: html1,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendEmail;
