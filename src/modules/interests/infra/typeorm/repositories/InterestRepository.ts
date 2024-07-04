/* eslint-disable @typescript-eslint/no-array-constructor */
import { getRepository, Repository } from 'typeorm';

// import AppError from '@shared/errors/AppError';
import IInterestsRepository from '../../../repositories/IInterestsRepository';
// import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import Interest from '../entities/Interest';
import InterestsItem from '../entities/interestsItem';

class InterestRepository implements IInterestsRepository {
  private interestRepository: Repository<Interest>;

  private interestsItemRepository: Repository<InterestsItem>;

  constructor() {
    this.interestRepository = getRepository(Interest);
    this.interestsItemRepository = getRepository(InterestsItem);
  }

  public async findAllInterests(): Promise<Interest[]> {
    const interest = await this.interestRepository.find();
    return interest;
  }

  public async createInterest(name: string): Promise<Interest> {
    const interest = await this.interestRepository.create({ name });
    await this.interestRepository.save(interest);
    return interest;
  }

  public async findItemByInterests(
    id_interest: string,
  ): Promise<InterestsItem[]> {
    const interestItems = await this.interestsItemRepository.find({
      where: {
        id_interest,
      },
    });
    return interestItems;
  }

  public async createInterestItem(
    name: string,
    id_interest: string,
  ): Promise<InterestsItem> {
    const interestItem = await this.interestsItemRepository.create({
      name,
      id_interest,
    });
    await this.interestRepository.save(interestItem);
    return interestItem;
  }
}
export default InterestRepository;
