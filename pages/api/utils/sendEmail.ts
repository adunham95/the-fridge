import { SES } from 'aws-sdk';

const SES_CONFIG = {
  accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_EMAIL_ACCESS_KEY_SECRET,
  region: 'us-east-1',
};

const AWS_SES = new SES(SES_CONFIG);
const sourceEmail = 'support@frige.social';

enum EEmailTemplates {}

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

export default {
  EEmailTemplates,
  sendEmail,
  sendTemplateEmail,
};
