import { injectable, inject } from 'tsyringe';
import ICreateCreditCardDTO from '../../dtos/CreditCard/ICreateCreditCardDTO';
import CreditCard from '../../infra/typeorm/entities/CreditCards/CreditCard';
import ICreditCardsRepository from '../../repositories/CreditCards/ICreditCardsRepository';

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  public async execute({
    id_user,
    token,
    final_digits,
    flag,
  }: ICreateCreditCardDTO): Promise<CreditCard> {
    const creditCard = this.creditCardsRepository.create({
      id_user,
      token,
      final_digits,
      flag,
    });

    return creditCard;
  }
}

export default CreateCreditCardService;
