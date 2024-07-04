import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IVouchersRepository from '@modules/vouchers/repositories/IVouchersRepository';
import ICreateVoucherDTO from '../../../dtos/ICreateVoucherDTO';
import IUpdateVoucherDTO from '../../../dtos/IUpdateVoucherDTO';
import VoucherMenu from '../entities/VoucherMenu';
import Voucher from '../entities/Voucher';

class VouchersRepository implements IVouchersRepository {
  private voucherMenuRepository: Repository<VoucherMenu>;

  private voucherRepository: Repository<Voucher>;

  constructor() {
    this.voucherMenuRepository = getRepository(VoucherMenu);
    this.voucherRepository = getRepository(Voucher);
  }

  public async findMenu(): Promise<VoucherMenu[]> {
    const vouchersMenu = await this.voucherMenuRepository.query(
      'select vou.id, vou.id_sport ,vou.percentage,spo.name, spo.photo from vouchers_menu vou inner join sports spo on vou.id_sport = spo.id',
    );
    return vouchersMenu;
  }

  public async createVoucher(data: ICreateVoucherDTO): Promise<Voucher> {
    const voucher = await this.voucherRepository.create(data);

    await this.voucherRepository.save(voucher);
    const voucher_number = voucher.id.substring(voucher.id.length, 30);
    voucher.voucher_number = voucher_number;
    await this.voucherRepository.save(voucher);
    return voucher;
  }

  public async updateVoucher(data: IUpdateVoucherDTO): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!voucher) {
      throw new AppError('Voucher not found');
    }

    voucher.id_sport = data.id_sport;
    voucher.percentage = data.percentage;
    voucher.pix_url = data.pix_url;
    voucher.pix_key = data.pix_key;
    voucher.price = data.price;
    await this.voucherRepository.save(voucher);

    return voucher;
  }
}
export default VouchersRepository;
