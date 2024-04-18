const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'flickloungenetwork@gmail.com',
        pass: 'twoc vpvc dgrj henn'
    }
});

// Function to send email
const sendEmail = async (recipient, subject, text) => {
    try {
        // Define email options
        const mailOptions = {
            from: 'flickloungenetwork@gmail.com',
            to: recipient,
            subject: subject,
            text: text
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
