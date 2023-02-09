import { injectable, inject } from 'tsyringe';
import Interest from '../infra/typeorm/entities/Interest';
import IInterestsRepository from '../repositories/IInterestsRepository';

@injectable()
class FindAllInterests {
  constructor(
    @inject('InterestRepository')
    private InterestRepository: IInterestsRepository,
  ) {}

  public async execute(): Promise<Interest[]> {
    const interests = await this.InterestRepository.findAllInterests();
    return interests;
  }
}

export default FindAllInterests;
