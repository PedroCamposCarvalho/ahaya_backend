import { injectable, inject } from 'tsyringe';
import PackagesPayers from '../infra/typeorm/entities/PackagesPayers';
import ICreatePayerDTO from '../dtos/ICreatePayerDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreatePayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: ICreatePayerDTO): Promise<PackagesPayers> {
    const payer = await this.payersRepository.createPayer(data);

    return payer;
  }
}

export default CreatePayerService;
