import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ValidateLastCodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string, code: string): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found');
    }
    const codeValid = await this.usersRepository.validateLastCode(
      user.id,
      code,
    );
    return codeValid;
  }
}

export default ValidateLastCodeService;
