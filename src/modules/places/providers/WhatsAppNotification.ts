import axios from 'axios';

export default async function WhatsAppNotification(
  contact_phone_number: string,
  message: string,
): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json',
  };

  const formattedNumber = `+55${contact_phone_number
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
    .trim()}`;

  const data = {
    apikey: process.env.WHATSAPP_API,
    phone_number: '5547992759520',
    contact_phone_number: formattedNumber,
    message_custom_id: '',
    message_type: 'text',
    message_body: message,
    check_status: 1,
    message_to_group: 0,
  };

  await axios.post('https://app.whatsgw.com.br/api/WhatsGw/Send', data, {
    headers,
  });

  return true;
}
