import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { id_transaction } = request.query;

  try {
    const response2 = await axios.post(
      process.env.ENV === 'dev'
        ? `https://sandbox-app.vindi.com.br/api/v1/charges/${id_transaction}/refund`
        : `https://app.vindi.com.br/api/v1/charges/${id_transaction}/refund`,
      {},
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
    if (String(response2.data.charge.status) === 'canceled') {
      return response.json({ ok: true });
    }
    return response.json({ ok: false });
  } catch (error) {
    throw new Error();
  }
};
