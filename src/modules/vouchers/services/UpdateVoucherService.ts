import { injectable, inject } from 'tsyringe';
import Voucher from '../infra/typeorm/entities/Voucher';
import IUpdateVoucherDTO from '../dtos/IUpdateVoucherDTO';
import IVouchersRepository from '../repositories/IVouchersRepository';

@injectable()
class UpdateVoucherService {
  constructor(
    @inject('VouchersRepository')
    private VouchersRepository: IVouchersRepository,
  ) {}

  public async execute(data: IUpdateVoucherDTO): Promise<Voucher> {
    const voucher = await this.VouchersRepository.updateVoucher(data);
    return voucher;
  }
}

export default UpdateVoucherService;
