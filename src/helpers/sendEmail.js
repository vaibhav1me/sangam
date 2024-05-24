import User from "@/models/User";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

export const sendEmail = async (email, emailType) => {
  try {
    const token = randomUUID();
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(
        { email },
        {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        { email },
        {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }
    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p><a href="${
        process.env.DOMAIN
      }/verifyemail?vID=${token}">Click here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.
            or
            Copy and paste the link in browser
            <br>
            ${process.env.DOMAIN}/verifyemail?vID=${token}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log("Error while sending email");
    throw new Error(error.message);
  }
};
