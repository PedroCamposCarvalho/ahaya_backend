import { getRepository, Repository } from 'typeorm';

import ITermsConditionsRepository from '@modules/places/repositories/TermsConditions/ITermsConditionsRepository';

import TermsConditions from '../../entities/TermsConditions/TermsConditions';

class TermsConditionsRepository implements ITermsConditionsRepository {
  private ormRepository: Repository<TermsConditions>;

  constructor() {
    this.ormRepository = getRepository(TermsConditions);
  }

  public async find(): Promise<TermsConditions> {
    const terms = await this.ormRepository.find();
    return terms[0];
  }
}
export default TermsConditionsRepository;
