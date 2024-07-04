/* eslint-disable import/no-duplicates */
import { injectable, inject } from 'tsyringe';
import path from 'path';
import { format, addHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPlacesRepository from '@modules/places/repositories/Places/IPlacesRepository';

import ICreateExperimentalClassUsersDTO from '../dtos/ICreateExperimentalClassUsersDTO';
import ExperimentalClassUsers from '../infra/typeorm/entities/ExperimentalClassUsers';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class CreateExperimentalClassUserService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute(
    data: ICreateExperimentalClassUsersDTO,
  ): Promise<ExperimentalClassUsers> {
    const experimentalClassUser =
      await this.experimentalClassRepository.createUser(data);

    const user = await this.usersRepository.findById(data.id_user);

    if (!user) {
      throw new AppError('User not found');
    }

    const experimentalClass = await this.experimentalClassRepository.findById(
      data.id_experimental_class,
    );

    const place = await this.placesRepository.findById(
      experimentalClass.id_place,
    );

    if (!place) {
      throw new AppError('Place not found');
    }

    const classConfirmationTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'emails',
      'ExperimentalClassConfirmation',
      `${process.env.CLIENT}.hbs`,
    );

    const formattedDate = format(
      addHours(experimentalClass.start_date, 0),
      " dd'/'MM'/'yyyy 'às' HH:mm",
      {
        locale: ptBR,
      },
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[BT Place] Confirmação de aula experimental',
      templateData: {
        file: classConfirmationTemplate,
        variables: {
          name: user.name,
          place: place.name,
          date: formattedDate,
        },
      },
    });

    return experimentalClassUser;
  }
}

export default CreateExperimentalClassUserService;
