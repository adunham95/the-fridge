import { config, S3 } from 'aws-sdk';

// Set the region (other credentials are in process.env)
config.update({ region: 'ap-northeast-2' });

// Create S3 service object
const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_IMAGE_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_IMAGE_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});

const upload = async (fileName: string, mimetype: string, body: Buffer) => {
  console.log({ fileName, bucket: process.env.AWS_IMAGE_BUCKET_NAME });
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.AWS_IMAGE_BUCKET_NAME || '',
        Key: fileName,
        Body: body,
        ContentType: mimetype,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      },
    );
  });
};

export default upload;
