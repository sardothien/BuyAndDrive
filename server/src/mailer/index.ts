import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { envVal } from '../envVal';

const sendPlainTextMail = (recipient: string, text: string):void => {
    
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: envVal.gmailUser,
      pass: envVal.gmailPass
    }
  }));

  const mailOptions = {
    from: envVal.gmailUser,
    to: recipient,
    subject: 'test',
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
}

export const sendSignUpSuccessfulMail = (userEmail: string): void => {
  const text = `Testing stuff`;
  sendPlainTextMail(userEmail, text);
};
