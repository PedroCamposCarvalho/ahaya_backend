import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  ssn: string;
  cellphone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  birth_date: Date;
  gender: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    ssn,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    cellphone,
    birth_date,
    gender,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;
    user.ssn = ssn;
    user.cellphone = cellphone;
    user.zipCode = zipCode;
    user.street = street;
    user.number = number;
    user.complement = complement;
    user.district = district;
    user.city = city;
    user.state = state;
    user.birth_date = birth_date;
    user.gender = gender;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
