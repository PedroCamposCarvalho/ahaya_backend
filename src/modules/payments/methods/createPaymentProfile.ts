import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const response2 = await axios.post(
      'https://app.vindi.com.br/api/v1/public/payment_profiles',
      request.body,
      {
        auth: {
          username: keys().production_public_key,
          password: '',
        },
      },
    );
    return response.json({
      gateway_token: response2.data.payment_profile.gateway_token,
    });
  } catch (error) {
    throw new Error();
  }
};
