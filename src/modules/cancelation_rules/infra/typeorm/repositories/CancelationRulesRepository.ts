import { getRepository, Repository } from 'typeorm';

import ICancelationRulesRepository from '@modules/cancelation_rules/repositories/ICancelationRulesRepository';
import AppError from '@shared/errors/AppError';
import ICreateCancelationRule from '../../../dtos/ICreateCancelationRuleDTO';
import IUpdateCancelationRule from '../../../dtos/IUpdateCancelationRuleDTO';
import ICreateCancelationRequestDTO from '../../../dtos/ICreateCancelationRequestDTO';
import IUpdateCancelationRequestDTO from '../../../dtos/IUpdateCancelationRequestDTO';

import CancelationRule from '../entities/CancelationRule';
import CancelationRequest from '../entities/CancelationRequest';

class CancelationRulesRepository implements ICancelationRulesRepository {
  private ormRepository: Repository<CancelationRule>;

  private requestRepository: Repository<CancelationRequest>;

  constructor() {
    this.ormRepository = getRepository(CancelationRule);
    this.requestRepository = getRepository(CancelationRequest);
  }

  public async create(data: ICreateCancelationRule): Promise<CancelationRule> {
    const { hour, minutes } = data;
    const existingRule = await this.ormRepository.findOne({
      where: { hour, minutes },
    });
    if (existingRule) {
      throw new AppError('This rule already exists');
    }
    const cancelationRule = await this.ormRepository.create(data);
    await this.ormRepository.save(cancelationRule);
    return cancelationRule;
  }

  public async findAllRules(): Promise<CancelationRule[]> {
    const rules = await this.ormRepository.find();
    return rules;
  }

  public async update(data: IUpdateCancelationRule): Promise<CancelationRule> {
    const { id, hour, minutes, percentage, active } = data;
    const cancelationRule = await this.ormRepository.findOne({ where: { id } });
    if (!cancelationRule) {
      throw new AppError('Rule not found');
    }
    cancelationRule.hour = hour;
    cancelationRule.minutes = minutes;
    cancelationRule.percentage = percentage;
    cancelationRule.active = active;

    await this.ormRepository.save(cancelationRule);
    return cancelationRule;
  }

  public async delete(id: string): Promise<CancelationRule> {
    const cancelationRule = await this.ormRepository.findOne({ where: { id } });
    if (!cancelationRule) {
      throw new AppError('Rule not found');
    }
    await this.ormRepository.remove(cancelationRule);
    return cancelationRule;
  }

  public async createRequest(
    data: ICreateCancelationRequestDTO,
  ): Promise<CancelationRequest> {
    const existingRequest = await this.requestRepository.findOne({
      where: {
        id_appointment: data.id_appointment,
      },
    });
    if (existingRequest) {
      throw new AppError('This request already exists');
    }
    const newRequest = await this.requestRepository.create(data);

    await this.requestRepository.save(newRequest);

    return newRequest;
  }

  public async updateRequest(
    data: IUpdateCancelationRequestDTO,
  ): Promise<CancelationRequest> {
    const { id, id_appointment, percentage, done } = data;
    const existingRequest = await this.requestRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingRequest) {
      throw new AppError('Request not found');
    }
    existingRequest.id_appointment = id_appointment;
    existingRequest.percentage = percentage;
    existingRequest.done = done;

    await this.requestRepository.save(existingRequest);

    return existingRequest;
  }
}
export default CancelationRulesRepository;
