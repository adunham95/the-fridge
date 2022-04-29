import { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from './utils/sendEmail';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      const data = await sendEmail.sendEmail(
        ['adunham95@gmail.com'],
        'Hello World',
        'My First Email',
      );
      console.log(data);

      return res.status(200).json({ sent: 'ok' });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err: any) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
