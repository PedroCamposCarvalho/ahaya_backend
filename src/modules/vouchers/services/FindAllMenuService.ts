import { injectable, inject } from 'tsyringe';
import VoucherMenu from '../infra/typeorm/entities/VoucherMenu';
import IVouchersRepository from '../repositories/IVouchersRepository';

@injectable()
class FindAllMenuService {
  constructor(
    @inject('VouchersRepository')
    private VouchersRepository: IVouchersRepository,
  ) {}

  public async execute(): Promise<VoucherMenu[]> {
    const vouchersMenu = await this.VouchersRepository.findMenu();

    return vouchersMenu;
  }
}

export default FindAllMenuService;
