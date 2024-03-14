import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';


const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const { email, subject, template, data } = options;

    const templatePath = path.join(__dirname, '../mails', template);

    try {
        const html = await ejs.renderFile(templatePath, data);

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

export default sendMail;
