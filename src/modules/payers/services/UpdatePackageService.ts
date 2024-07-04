import { injectable, inject } from 'tsyringe';
import PackagesConfig from '../infra/typeorm/entities/PackagesConfig';
import IUpdatePackageDTO from '../dtos/IUpdatePackageDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class UpdatePackageService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: IUpdatePackageDTO): Promise<PackagesConfig> {
    const existingPackage = await this.payersRepository.updatePackage(data);

    return existingPackage;
  }
}

export default UpdatePackageService;
