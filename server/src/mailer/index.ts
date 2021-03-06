import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { envVal } from '../envVal';
import * as tokens from '../auth/tokens';


const sendPlainTextMail = (recipient: string, subject: string, text: string):void => {
    
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
    subject,
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

export const sendSignUpSuccessfulMail = (userEmail: string, userId: string): void => {
  const token = `Click here to verify signup: ${envVal.frontendUrl}/confirm_signup/${tokens.generateSignUpToken(userId)}`;

  sendPlainTextMail(userEmail, 'Signup successful', token);
};

export const sendResetPasswordMail = (userEmail: string, userId: string): void => {
  const token = `Click here to reset your password: ${envVal.frontendUrl}/reset_password/${tokens.generateResetPasswordToken(userId)}`;

  sendPlainTextMail(userEmail, 'Reset password', token);
};

export const sendCarWaitingApprovalMail = (userEmail: string, make: string, model: string): void => {
  sendPlainTextMail(userEmail, 'Waiting for Car approval', `Your car ${make} ${model} is added and waiting for admin approval.`);
  
  const adminEmail = process.env.GMAIL_USER;
  if(!adminEmail) {
    return;
  }
  const body = `You have new approval request. Review request here: ${envVal.frontendUrl}/approve_cars`;
  sendPlainTextMail(adminEmail, 'New Car request', body);
};

export const sendCarApprovedMail = (userEmail: string, make: string, model: string, carId: string): void => {
  const body = `Your car ${make} ${model} is now approved and visible for everyone. You can find it on next link: ${envVal.frontendUrl}/car/${carId}`;
  sendPlainTextMail(userEmail, 'Car approved', body);
};

export const sendCarRejectedMail = (userEmail: string, make: string, model: string, reason: string): void => {
  sendPlainTextMail(userEmail, 'Car rejected', `Your car ${make} ${model} is rejected because:\n${reason} \nPlease try again.`);
};

export const sendCarBoughtMail = (userEmail: string, make: string, model: string): void => {
  sendPlainTextMail(userEmail, 'Car bought', `You bought car ${make} ${model}.`);
};

export const sendCarSoldMail = (userEmail: string, make: string, model: string): void => {
  sendPlainTextMail(userEmail, 'Car sold', `Your car ${make} ${model} has been sold.`);
};