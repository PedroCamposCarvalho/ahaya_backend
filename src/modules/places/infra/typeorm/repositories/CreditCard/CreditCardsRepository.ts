import { getRepository, Repository } from 'typeorm';

import ICrediCardsRepository from '@modules/places/repositories/CreditCards/ICreditCardsRepository';
import ICreateCreditCardDTO from '@modules/places/dtos/CreditCard/ICreateCreditCardDTO';

import CreditCard from '../../entities/CreditCards/CreditCard';

class CrediCardsRepository implements ICrediCardsRepository {
  private ormRepository: Repository<CreditCard>;

  constructor() {
    this.ormRepository = getRepository(CreditCard);
  }

  public async create(
    CreditCardData: ICreateCreditCardDTO,
  ): Promise<CreditCard> {
    const creditCard = this.ormRepository.create(CreditCardData);
    await this.ormRepository.save(creditCard);
    return creditCard;
  }

  public async save(creditCard: CreditCard): Promise<CreditCard> {
    return this.ormRepository.save(creditCard);
  }

  public async findAll(id_user: string): Promise<CreditCard[]> {
    const creditCards = await this.ormRepository.find({
      where: {
        id_user,
      },
    });
    return creditCards;
  }

  public async delete(id_card: string): Promise<void> {
    await this.ormRepository.delete(id_card);
  }

  public async findByFinalDigitsAndUser(
    id_user: string,
    final_digits: string,
  ): Promise<CreditCard | undefined> {
    const creditCard = await this.ormRepository.findOne({
      where: {
        id_user,
        final_digits,
      },
    });
    return creditCard;
  }
}
export default CrediCardsRepository;
