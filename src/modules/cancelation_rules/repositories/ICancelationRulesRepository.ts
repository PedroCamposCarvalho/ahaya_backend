import ICreateCancelationRule from '../dtos/ICreateCancelationRuleDTO';
import IUpdateCancelationRule from '../dtos/IUpdateCancelationRuleDTO';
import ICreateCancelationRequestDTO from '../dtos/ICreateCancelationRequestDTO';
import IUpdateCancelationRequestDTO from '../dtos/IUpdateCancelationRequestDTO';
import CancelationRule from '../infra/typeorm/entities/CancelationRule';
import CancelationRequest from '../infra/typeorm/entities/CancelationRequest';

export default interface ICancelationRulesRepository {
  create(data: ICreateCancelationRule): Promise<CancelationRule>;
  findAllRules(): Promise<CancelationRule[]>;
  update(data: IUpdateCancelationRule): Promise<CancelationRule>;
  delete(id: string): Promise<CancelationRule>;
  createRequest(
    data: ICreateCancelationRequestDTO,
  ): Promise<CancelationRequest>;
  updateRequest(
    data: IUpdateCancelationRequestDTO,
  ): Promise<CancelationRequest>;
}
