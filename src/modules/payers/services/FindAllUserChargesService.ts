import { injectable, inject } from 'tsyringe';
import ChargesHistory from '../infra/typeorm/entities/ChargesHistory';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindAllUserChargesService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(id_user: string): Promise<ChargesHistory[]> {
    const packages = await this.payersRepository.findAllUserCharges(id_user);

    return packages;
  }
}

export default FindAllUserChargesService;
