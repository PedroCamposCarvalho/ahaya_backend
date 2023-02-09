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
    return response.json({
      paymentProps: {
        id: response2.data.bill.charges[0].id,
        pix_code:
          response2.data.bill.charges[0].last_transaction
            .gateway_response_fields.qrcode_original_path,
        pix_qr_code:
          response2.data.bill.charges[0].last_transaction
            .gateway_response_fields.qrcode_path,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
