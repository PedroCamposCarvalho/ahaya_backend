import { injectable, inject } from 'tsyringe';
import CreditCard from '../../infra/typeorm/entities/CreditCards/CreditCard';
import ICreditCardsRepository from '../../repositories/CreditCards/ICreditCardsRepository';

@injectable()
class FindByFinalDigitsAndUserService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  public async execute(
    id_user: string,
    final_digits: string,
  ): Promise<CreditCard | undefined> {
    const creditCard = this.creditCardsRepository.findByFinalDigitsAndUser(
      id_user,
      final_digits,
    );
    return creditCard;
  }
}

export default FindByFinalDigitsAndUserService;
