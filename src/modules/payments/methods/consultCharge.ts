import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const id = String(request.query.id);
  try {
    const response2 = await axios.get(
      `https://app.vindi.com.br/api/v1/charges/${id}`,
      {
        auth: {
          username: keys().production_private_key,
          password: '',
        },
      },
    );
    return response.json({ status: response2.data.charge.status });
  } catch (error) {
    throw new Error();
  }
};
