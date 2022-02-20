import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMailUpdate = async (imageName, imageStatusMessage, imageDetails, tweet) => {
    
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: String(process.env.SENDER_EMAIL),
            pass: String(process.env.SENDER_EMAIL_PASSWORD)
        },
      });
      let htmlBody = imageDetails ? imageDetails + " generated for <i>" + tweet + "/<i>" : "Unable to generate image for <i>" + tweet + "</i>";
      let mailDetails = {
          from: "definingarttez@gmail.com",
          to: "definingarttez@gmail.com",
          subject: "Image " + imageName + " was " + imageStatusMessage,
          html: "<b>"+ htmlBody + "</b>"
      };
      let mailResponse;
      try {
        mailResponse = await transporter.sendMail(mailDetails);
      } catch (e) {
          throw new Error("Error while sending mail for " + imageName + " : " + e);
      }

      return mailResponse;
}
