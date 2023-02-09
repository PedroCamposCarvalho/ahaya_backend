import { injectable, inject } from 'tsyringe';
import ChargesConfig from '../infra/typeorm/entities/ChargesConfig';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindUserChargeConfigService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(id_user: string): Promise<ChargesConfig | undefined> {
    const chargeConfig = await this.payersRepository.findUserChargeConfig(
      id_user,
    );
    return chargeConfig;
  }
}

export default FindUserChargeConfigService;
