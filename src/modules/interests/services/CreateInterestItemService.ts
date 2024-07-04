import { injectable, inject } from 'tsyringe';

import IInterestsRepository from '../repositories/IInterestsRepository';
import InterestItem from '../infra/typeorm/entities/interestsItem';

@injectable()
class CreateInterestItem {
  constructor(
    @inject('InterestRepository')
    private InterestRepository: IInterestsRepository,
  ) {}

  public async execute(
    name: string,
    id_interest: string,
  ): Promise<InterestItem> {
    const interestItem = await this.InterestRepository.createInterestItem(
      name,
      id_interest,
    );
    return interestItem;
  }
}

export default CreateInterestItem;
