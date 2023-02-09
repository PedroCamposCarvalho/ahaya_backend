import { injectable, inject } from 'tsyringe';

import IInterestsRepository from '../repositories/IInterestsRepository';
import Interest from '../infra/typeorm/entities/Interest';

@injectable()
class CreateInterest {
  constructor(
    @inject('InterestRepository')
    private InterestRepository: IInterestsRepository,
  ) {}

  public async execute(name: string): Promise<Interest> {
    const interest = await this.InterestRepository.createInterest(name);
    return interest;
  }
}

export default CreateInterest;
