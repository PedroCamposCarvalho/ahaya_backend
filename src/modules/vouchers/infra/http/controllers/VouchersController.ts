import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindAllMenuService from '@modules/vouchers/services/FindAllMenuService';
import CreateVoucherService from '@modules/vouchers/services/CreateVoucherService';
import UpdateVoucherService from '@modules/vouchers/services/UpdateVoucherService';

export default class VouchersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findAllMenuService = container.resolve(FindAllMenuService);
    const vouchers = await findAllMenuService.execute();
    return response.json(vouchers);
  }

  public async createVoucher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createVoucherService = container.resolve(CreateVoucherService);
    const voucher = await createVoucherService.execute(request.body);
    return response.json(voucher);
  }

  public async updateVoucher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateVoucherService = container.resolve(UpdateVoucherService);
    const voucher = await updateVoucherService.execute(request.body);
    return response.json(voucher);
  }
}
