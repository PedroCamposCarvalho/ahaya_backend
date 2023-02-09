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
        ? 'https://app.vindi.com.br/api/v1/customers'
        : 'https://app.vindi.com.br/api/v1/customers',

      request.body,
      {
        auth: {
          username: keys().production_private_key,
          password: '',
        },
      },
    );
    return response.json({ customer_id: response2.data.customer.id });
  } catch (error) {
    throw new Error();
  }
};
