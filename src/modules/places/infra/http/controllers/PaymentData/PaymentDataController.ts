import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindService from '../../../../services/PaymentData/FindService';

export default class PaymentDataController {
  public async find(request: Request, response: Response): Promise<Response> {
    const findService = container.resolve(FindService);
    const paymentdata = await findService.execute();

    return response.json(paymentdata);
  }
}
