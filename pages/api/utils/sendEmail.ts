import { SES } from 'aws-sdk';
import MyTemplates from '../utils/emailTemplates.json';

const SES_CONFIG = {
  accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_EMAIL_ACCESS_KEY_SECRET,
  region: 'us-east-1',
};

const AWS_SES = new SES(SES_CONFIG);
const sourceEmail = 'Fridge <support@fridge.social>';

enum EEmailTemplates {}

export enum EMyEmailTemplates {
  VALIDATE_EMAIL = 'validateEmail',
  RESET_PASSWORD_EMAIL = 'passwordReset',
}

function sendEmail(
  recipientEmails: Array<string>,
  subject: string,
  body: string,
) {
  const params = {
    Source: sourceEmail,
    Destination: {
      ToAddresses: recipientEmails,
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
}

const sendTemplateEmail = (
  recipientEmails: Array<string>,
  templateName: string,
  templateData: object,
) => {
  const TemplateData = JSON.stringify(templateData);
  const params = {
    Source: sourceEmail,
    Template: templateName,
    Destination: {
      ToAddresses: recipientEmails,
    },
    TemplateData,
  };
  return AWS_SES.sendTemplatedEmail(params).promise();
};

const sentMyTemplateEmail = (
  recipientEmails: Array<string>,
  templateName: EMyEmailTemplates,
  options: { [key: string]: string },
) => {
  const template = MyTemplates[templateName];
  let header = template.SubjectPart;
  let body = template.HtmlPart;

  Object.entries(options).map((k) => {
    body = body.replaceAll(`{{${k[0]}}}`, k[1]);
    header = header.replaceAll(`{{${k[0]}}}`, k[1]);
  });

  const params = {
    Source: sourceEmail,
    Destination: {
      ToAddresses: recipientEmails,
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: header,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

export default {
  EEmailTemplates,
  sendEmail,
  sentMyTemplateEmail,
};
