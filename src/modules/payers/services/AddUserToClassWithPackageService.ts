import { injectable, inject } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import MonthlyCreditCards from '../infra/typeorm/entities/MonthlyCreditCards';
import ICreateMonthlyCreditCardDTO from '../dtos/ICreateMonthlyCreditCardDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class AddUserToClassWithPackageService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(id_user: string): Promise<MonthlyCreditCards> {
    const packages = await this.payersRepository.findUserRemainingPackages(
      id_user,
    );

    if (packages === 0) {
      throw new AppError('Você não tem pacotes disponíveis');
    }

    return monthlyCreditCard;
  }
}

export default AddUserToClassWithPackageService;
