import { injectable, inject } from 'tsyringe';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindAllPackagesService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(id_user: string): Promise<number> {
    const payer = await this.payersRepository.findPayer(id_user);

    const history = await this.payersRepository.findPayerHistory(id_user);

    if (!payer) {
      return 0;
    }

    const existingPackage = await this.payersRepository.findPackageById(
      payer.id_package,
    );

    const totalPackages = existingPackage.amount + payer.courtesy;

    if (history.length === 0) {
      return totalPackages;
    }

    let historyUsage = 0;

    history.map(item => {
      historyUsage += item.amount;
      return null;
    });

    return totalPackages - historyUsage;
  }
}

export default FindAllPackagesService;
