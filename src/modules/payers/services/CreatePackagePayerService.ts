import { injectable, inject } from 'tsyringe';
import PackagesPayers from '../infra/typeorm/entities/PackagesPayers';
import ICreatePackagePayerDTO from '../dtos/ICreatePackagePayerDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreatePackagePayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: ICreatePackagePayerDTO): Promise<PackagesPayers> {
    const newPayer = await this.payersRepository.createPackagePayer(data);

    return newPayer;
  }
}

export default CreatePackagePayerService;
