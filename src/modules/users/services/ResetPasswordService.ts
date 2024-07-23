import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(email: string, password: string): Promise<void> {
    // const userToken = await this.userTokensRepository.findByToken(token);
    // if (!userToken) {
    //   throw new AppError('User token does not exists');
    // }
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    // const tokenCreatedAt = userToken.created_at;
    // const compareDate = addHours(tokenCreatedAt, 2);

    // if (isAfter(Date.now(), compareDate)) {
    //   throw new AppError('Token expired');
    // }
    const newPassword = await this.hashProvider.generateHash(password);
    console.log(newPassword);
    user.password = newPassword;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
