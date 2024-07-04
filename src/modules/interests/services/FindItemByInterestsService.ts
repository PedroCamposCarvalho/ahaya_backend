import { injectable, inject } from 'tsyringe';
import InterestsItem from '../infra/typeorm/entities/interestsItem';
import IInterestsRepository from '../repositories/IInterestsRepository';

@injectable()
class FindItemByInterestsService {
  constructor(
    @inject('InterestRepository')
    private InterestRepository: IInterestsRepository,
  ) {}

  public async execute(id_interest: string): Promise<InterestsItem[]> {
    const interestsItems = await this.InterestRepository.findItemByInterests(
      id_interest,
    );
    return interestsItems;
  }
}

export default FindItemByInterestsService;
