import { injectable, inject } from 'tsyringe';
import MonthlyCreditCards from '../infra/typeorm/entities/MonthlyCreditCards';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindUserCreditCardService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(
    id_user: string,
  ): Promise<MonthlyCreditCards | undefined> {
    const monthlyCreditCard = await this.payersRepository.findUserCreditCard(
      id_user,
    );

    if (monthlyCreditCard) {
      monthlyCreditCard.cvc = '';
    }

    return monthlyCreditCard;
  }
}

export default FindUserCreditCardService;
