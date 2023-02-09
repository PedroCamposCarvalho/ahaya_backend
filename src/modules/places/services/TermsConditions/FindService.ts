import { injectable, inject } from 'tsyringe';
import TermsConditions from '../../infra/typeorm/entities/TermsConditions/TermsConditions';
import ITermsConditionsRepository from '../../repositories/TermsConditions/ITermsConditionsRepository';

@injectable()
class FindService {
  constructor(
    @inject('TermsConditionsRepository')
    private termsConditionsRepository: ITermsConditionsRepository,
  ) {}

  public async execute(): Promise<TermsConditions> {
    const terms = this.termsConditionsRepository.find();

    return terms;
  }
}

export default FindService;
