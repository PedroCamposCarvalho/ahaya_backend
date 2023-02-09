import { injectable, inject } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import PasswordCode from '../infra/typeorm/entities/PasswordCode';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreatePasswordCodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
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

    const passwordCodeTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'emails',
      'PasswordCode',
      `${process.env.CLIENT}.hbs`,
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Código de recuperação de senha!',
      templateData: {
        file: passwordCodeTemplate,
        variables: {
          code: passwordCode.code,
        },
      },
    });

    return passwordCode;
  }
}

export default CreatePasswordCodeService;
