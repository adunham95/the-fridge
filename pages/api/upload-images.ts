import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from './utils/runMiddleware';
import uploadS3 from './utils/uploadS3';

interface RequestWithFile extends NextApiRequest {
  file?: any;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // Max file size (1 mb)
    fileSize: 1024 * 1024,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      let imgFileName = '';
      await runMiddleware(req, res, upload.single('image'));

      if (!req.file) return res.status(400).json({ error: 'File empty' });

      const { fileName } = req.body;

      imgFileName = !fileName ? req.file.originalname : fileName;

      const uploadResult = await uploadS3(
        imgFileName,
        req.file.mimetype,
        req.file.buffer,
      );

      return res.json({
        url: `https://d6rezagtnxx5b.cloudfront.net/${imgFileName}`,
        s3src: uploadResult,
      });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err: any) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
