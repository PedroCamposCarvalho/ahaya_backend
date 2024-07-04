import axios from 'axios';
import white_label from '../../../white_label/index';

export default async function SpecificsNotification(
  users: string[],
  title: string,
  message: string,
): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json',

    Authorization: `Basic ${white_label().notification_api_key}`,
  };

  const data = {
    app_id: white_label().notification_id,
    include_player_ids: users,
    channel_for_external_user_ids: 'push',
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
