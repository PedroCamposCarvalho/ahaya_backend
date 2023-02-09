import { injectable, inject } from 'tsyringe';
import PackagesConfig from '../infra/typeorm/entities/PackagesConfig';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindAllPackagesService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(): Promise<PackagesConfig[]> {
    const packages = await this.payersRepository.findAllPackages();

    return packages;
  }
}

export default FindAllPackagesService;
