import  * as mailjet from 'node-mailjet'
import { envVal } from '../envVal';

const sendEmail = async (receiver: string, subject: string, body: string): Promise<void> => {
  const sender = mailjet.connect(envVal.mailjetApiKey, envVal.mailjetSecretKey);
  
  await sender.post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": envVal.mailjetEmail,
          "Name": "Test"
        },
        "To": [
          {
            "Email": receiver,
            "Name": "Test"
          }
        ],
        "Subject": subject,
        "TextPart": body,
      }
    ]
  })
}

export const sendSignupSuccesfulMail = async (receiver: string): Promise<void> => {
  const body = `Signup mail for ${receiver}`;
  await sendEmail(receiver, 'Signup successful', body);
}