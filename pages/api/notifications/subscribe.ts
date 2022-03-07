import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import webpush from 'web-push';

console.log({
  NEXT_PUBLIC_WEB_PUSH_CONTACT: process.env.NEXT_PUBLIC_WEB_PUSH_CONTACT,
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  NEXT_PUBLIC_VAPID_PRIVATE_KEY: process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY,
});

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_WEB_PUSH_CONTACT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY,
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const subscription = req.body;

  console.log(subscription);

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  });

  webpush
    .sendNotification(subscription, payload)
    .then((result: any) => console.log(result))
    .catch((e: any) => console.log(e.stack));

  res.status(200).json({ success: true });
}
