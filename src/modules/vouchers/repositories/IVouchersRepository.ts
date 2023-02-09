import VoucherMenu from '../infra/typeorm/entities/VoucherMenu';
import Voucher from '../infra/typeorm/entities/Voucher';
import ICreateVoucherDTO from '../dtos/ICreateVoucherDTO';
import IUpdateVoucherDTO from '../dtos/IUpdateVoucherDTO';

export default interface IVouchersRepository {
  findMenu(): Promise<VoucherMenu[]>;
  createVoucher(data: ICreateVoucherDTO): Promise<Voucher>;
  updateVoucher(data: IUpdateVoucherDTO): Promise<Voucher>;
}
