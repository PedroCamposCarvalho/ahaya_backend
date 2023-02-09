import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const response2 = await axios.post(
      process.env.ENV === 'dev'
        ? 'https://sandbox-app.vindi.com.br/api/v1/subscriptions'
        : 'https://app.vindi.com.br/api/v1/subscriptions',

      request.body,
      {
        auth: {
          username:
            process.env.ENV === 'dev'
              ? keys().sandbox_private_key
              : keys().production_private_key,
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
