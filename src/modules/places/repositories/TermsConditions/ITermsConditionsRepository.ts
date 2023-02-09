import TermsConditions from '../../infra/typeorm/entities/TermsConditions/TermsConditions';

export default interface ICourtsRepository {
  find(): Promise<TermsConditions>;
}
