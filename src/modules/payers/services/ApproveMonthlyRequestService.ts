import { injectable, inject } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';

import AppError from '@shared/errors/AppError';
import getDayOfWeekDescription from '@shared/utils/getDayOfWeekDescription';
import MonthlyRequest from '../infra/typeorm/entities/MonthlyRequest';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class ApproveMonthlyRequestService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_request: string): Promise<MonthlyRequest> {
    const monthlyRequest = await this.payersRepository.approveMonthlyRequest(
      id_request,
    );

    const { id_user, id_class } = monthlyRequest;

    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('User not found');
    }

    const teacherClass = await this.teachersRepository.findClassById(id_class);

    const requestApprovedTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'emails',
      'MonthlyRequestApproved',
      `${process.env.CLIENT}.hbs`,
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Oba! Estamos ansiosos para lhe receber!',
      templateData: {
        file: requestApprovedTemplate,
        variables: {
          suffix: getDayOfWeekDescription(teacherClass.day_of_week).suffix,
          day_of_week: getDayOfWeekDescription(teacherClass.day_of_week).day,
          hour:
            teacherClass.hour < 10
              ? `0${teacherClass.hour}:00`
              : `${teacherClass.hour}:00`,
        },
      },
    });

    return monthlyRequest;
  }
}

export default ApproveMonthlyRequestService;
