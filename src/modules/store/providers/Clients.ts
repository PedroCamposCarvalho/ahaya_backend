import white_label from '../../../white_label';

interface INotificationProps {
  api_key: string;
  app_id: string;
}

const data: INotificationProps = {} as INotificationProps;

if (String(process.env.CLIENT) === 'Ahaya') {
  data.api_key = white_label().notification_api_key;
  data.app_id = white_label().notification_id;
}

export default data;
