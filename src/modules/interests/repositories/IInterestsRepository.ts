import Interest from '../infra/typeorm/entities/Interest';
import InterestsItem from '../infra/typeorm/entities/interestsItem';

export default interface IInterestsRepository {
  findAllInterests(): Promise<Interest[]>;
  createInterest(name: string): Promise<Interest>;
  findItemByInterests(id_interest: string): Promise<InterestsItem[]>;
  createInterestItem(name: string, id_interest: string): Promise<InterestsItem>;
}
