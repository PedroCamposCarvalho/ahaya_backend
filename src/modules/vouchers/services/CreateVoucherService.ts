import { injectable, inject } from 'tsyringe';
import Voucher from '../infra/typeorm/entities/Voucher';
import ICreateVoucherDTO from '../dtos/ICreateVoucherDTO';
import IVouchersRepository from '../repositories/IVouchersRepository';

@injectable()
class CreateVoucherService {
  constructor(
    @inject('VouchersRepository')
    private VouchersRepository: IVouchersRepository,
  ) {}

  public async execute(data: ICreateVoucherDTO): Promise<Voucher> {
    const voucher = await this.VouchersRepository.createVoucher(data);
    return voucher;
  }
}

export default CreateVoucherService;
