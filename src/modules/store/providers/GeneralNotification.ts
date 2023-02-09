import axios from 'axios';

export default async function SpecificsNotification(
  title: string,
  message: string,
): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json',

    Authorization: `Basic ${process.env.NOTIFICATION_API}`,
  };

  const data = {
    app_id: process.env.NOTIFICATION_APP_ID,
    included_segments: ['Subscribed Users'],
    headings: {
      en: title,
    },
    data: { foo: 'bar' },
    contents: { en: message },
  };

  await axios.post('https://onesignal.com/api/v1/notifications', data, {
    headers,
  });

  return true;
}
