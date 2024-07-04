import { injectable, inject } from 'tsyringe';
import PackagesConfig from '../infra/typeorm/entities/PackagesConfig';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class DeletePackageService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(id: string): Promise<PackagesConfig> {
    const existingPackage = await this.payersRepository.deletePackage(id);

    return existingPackage;
  }
}

export default DeletePackageService;
