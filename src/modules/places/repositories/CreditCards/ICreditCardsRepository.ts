import CreditCard from '../../infra/typeorm/entities/CreditCards/CreditCard';
import ICreateCreditCardDTO from '../../dtos/CreditCard/ICreateCreditCardDTO';

export default interface ICrediCardsRepository {
  create(data: ICreateCreditCardDTO): Promise<CreditCard>;
  save(credit_card: CreditCard): Promise<CreditCard>;
  findAll(id_user: string): Promise<CreditCard[]>;
  delete(id_card: string): Promise<void>;
  findByFinalDigitsAndUser(
    id_user: string,
    final_digits: string,
  ): Promise<CreditCard | undefined>;
}
