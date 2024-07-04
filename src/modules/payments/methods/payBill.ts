import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const response2 = await axios.post(
      'https://app.vindi.com.br/api/v1/bills',

      request.body,
      {
        auth: {
          username: keys().production_private_key,
          password: '',
        },
      },
    );
    if (String(response2.data.bill.status) === 'paid') {
      return response.json({
        paymentProps: {
          id: response2.data.bill.charges[0].id,
          payment_profile_id: response2.data.bill.payment_profile.id,
        },
      });
    }
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};
