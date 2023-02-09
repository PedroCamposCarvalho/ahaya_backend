/* eslint-disable no-useless-escape */
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  ssn: string;
  password: string;
  id_place: string;
  user_type: string;
  is_monthly: boolean;
  cellphone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  notification_id: string;
  gender: string;
  birth_date: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    ssn,
    password,
    id_place,
    user_type,
    is_monthly,
    cellphone,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    notification_id,
    gender,
    birth_date,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail existente!', 400);
    }

    const checkUserSsnExists = await this.usersRepository.findBySsn(ssn);

    if (checkUserSsnExists) {
      throw new AppError('CPF existente!', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      ssn,
      password: hashedPassword,
      id_place,
      user_type,
      is_monthly,
      cellphone,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      notification_id,
      birth_date: new Date(birth_date),
      gender,
    });

    return user;
  }
}

export default CreateUserService;
