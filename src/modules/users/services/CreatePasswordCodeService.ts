import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import PasswordCode from '../infra/typeorm/entities/PasswordCode';
import IUsersRepository from '../repositories/IUsersRepository';
import sendEmail from './methods/BrevoEmail';

@injectable()
class CreatePasswordCodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string): Promise<PasswordCode> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const code = String(Math.floor(Math.random() * 90000) + 10000);
    const passwordCode = await this.usersRepository.createPasswordCode(
      user.id,
      code,
    );

    sendEmail(user.email, user.name, code);

    return passwordCode;
  }
}

export default CreatePasswordCodeService;
