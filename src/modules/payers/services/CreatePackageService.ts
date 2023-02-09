import { injectable, inject } from 'tsyringe';
import PackagesConfig from '../infra/typeorm/entities/PackagesConfig';
import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreatePackageService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: ICreatePackageDTO): Promise<PackagesConfig> {
    const newPackage = await this.payersRepository.createPackage(data);

    return newPackage;
  }
}

export default CreatePackageService;
