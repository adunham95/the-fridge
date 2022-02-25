const subscription = req.body;

console.log(subscription);

const payload = JSON.stringify({
  title: 'Hello!',
  body: 'It works.',
});

webpush
  .sendNotification(subscription, payload)
  .then((result) => console.log(result))
  .catch((e) => console.log(e.stack));

res.status(200).json({ success: true });
