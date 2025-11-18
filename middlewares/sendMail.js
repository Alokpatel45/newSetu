import { createTransport } from "nodemailer";

// Create transporter only once
const transport = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const sendMail = async (email, subject, data) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name}, your OTP for account verification is:</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>`;

  try {
    await transport.sendMail({
      from: `"VidyaSetu" <${process.env.BREVO_USER}>`,
      to: email,
      subject,
      html,
    });
    console.log("Email sent successfully to:", email);
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
};

export default sendMail;
