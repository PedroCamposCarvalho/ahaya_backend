import { injectable, inject } from 'tsyringe';
import ICreditCardsRepository from '../../repositories/CreditCards/ICreditCardsRepository';

@injectable()
class DeleteCardService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  public async execute(id_card: string): Promise<void> {
    this.creditCardsRepository.delete(id_card);

    return undefined;
  }
}

export default DeleteCardService;
