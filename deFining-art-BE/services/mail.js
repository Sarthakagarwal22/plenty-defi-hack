import nodemailer from 'nodemailer';

export const sendMailUpdate = async (imageName, imageStatusMessage, imageDetails, tweet) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      let htmlBody = imageDetails ? imageDetails + " generated for <i>" + tweet + "/<i>" : "Unable to generate image for <i>" + tweet + "</i>";
      let mailDetails = {
          from: testAccount.user,
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
