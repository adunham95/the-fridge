import nextConnect from 'next-connect';
import multer from 'multer';
import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

interface MulterRequest extends NextApiRequest {
  files: any;
}

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_IMAGE_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_IMAGE_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});

const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('images'));

apiRoute.post((req: MulterRequest, res: NextApiResponse) => {
  console.log(req);

  const element = req.files[0];

  const params = {
    Bucket: process.env.AWS_IMAGE_BUCKET_NAME || '', // bucket that we made earlier
    Key: element.originalname, // Name of the image
    Body: element.buffer, // Body which will contain the image in buffer format
    ContentType: element.mimetype,
    // Necessary to define the image content-type to view the photo in the browser with the link
  };

  s3.putObject(params, (error, data) => {
    if (error) {
      res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
    }

    console.log(data);
    res.status(200).json({
      data: 'success',
      url: `https://d6rezagtnxx5b.cloudfront.net/${element.originalname}`,
    });
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
