import { injectable, inject } from 'tsyringe';
import CreditCard from '../../infra/typeorm/entities/CreditCards/CreditCard';
import ICreditCardsRepository from '../../repositories/CreditCards/ICreditCardsRepository';

@injectable()
class FindAllByUserService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  public async execute(id_user: string): Promise<CreditCard[]> {
    const creditCards = this.creditCardsRepository.findAll(id_user);

    return creditCards;
  }
}

export default FindAllByUserService;
