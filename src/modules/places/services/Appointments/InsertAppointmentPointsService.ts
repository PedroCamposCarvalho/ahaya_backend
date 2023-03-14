import { injectable, inject } from 'tsyringe';

import IScoreRepository from '@modules/score/repositories/IScoreRepository';

interface IServiceData {
  id_user: string;
  appointmentFinalPrice: number;
  userPoints: number;
  winningPoints: number;
  usingPoints: number;
  id_module: string;
}

@injectable()
class InsertAppointmentPointsService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(data: IServiceData): Promise<void> {
    const {
      id_user,
      appointmentFinalPrice,
      userPoints,
      winningPoints,
      usingPoints,
      id_module,
    } = data;
    if (appointmentFinalPrice > 0) {
      await this.scoreRepository.createUserHistory({
        id_user,
        id_module,
        price: Number(appointmentFinalPrice.toFixed(2)),
        points: usingPoints,
      });
      await this.scoreRepository.updateUserPoints({
        id_user,
        points: Number(userPoints) + Number(winningPoints) - usingPoints,
      });
    } else if (id_user > '') {
      await this.scoreRepository.updateUserPoints({
        id_user,
        points: Number(userPoints) + winningPoints,
      });
    }
    if (usingPoints > 0) {
      await this.scoreRepository.createUserUsedHistory({
        id_user,
        points: usingPoints,
      });
    }
  }
}

export default InsertAppointmentPointsService;
