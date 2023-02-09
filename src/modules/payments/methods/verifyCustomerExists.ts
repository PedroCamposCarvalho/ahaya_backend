import { Request, Response } from 'express';
import axios from 'axios';
import keys from '../keys';

export default async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const ssn = String(request.query.ssn);
  try {
    const existingCustomer = await axios.get(
      process.env.ENV === 'dev'
        ? `https://app.vindi.com.br/api/v1/customers?query=registry_code:${ssn}`
        : `https://app.vindi.com.br/api/v1/customers?query=registry_code:${ssn}`,
      {
        auth: {
          username: keys().production_private_key,
          password: '',
        },
      },
    );

    if (
      existingCustomer.data.customers.filter(
        (item: any) => item.status !== 'archived',
      ).length > 0
    ) {
      return response.json({
        id: String(
          existingCustomer.data.customers.filter(
            (item: any) => item.status !== 'archived',
          )[0].id,
        ),
      });
    }
    return response.json({ id: '0' });
  } catch (error) {
    throw new Error();
  }
};
