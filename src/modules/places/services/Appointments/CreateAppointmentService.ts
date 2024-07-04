import { injectable, inject } from 'tsyringe';
import path from 'path';
import { format } from 'date-fns';
import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import SpecificsNotification from '@modules/places/providers/SpecificsNotification';
import WhatsAppNotification from '@modules/places/providers/WhatsAppNotification';
import AppError from '@shared/errors/AppError';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';
import ICreateAppointmentDTO from '../../dtos/Appointments/ICreateAppointmentDTO';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

@injectable()
class CreateAppointmentservice {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute(data: ICreateAppointmentDTO): Promise<Appointment[]> {
    try {
      let exitFuncion = false;

      const appointmentsToReturn: Appointment[] = [];

      const adminUsers = await this.usersRepository.findAllAdminUsers();

      const { hours, appointment, materials } = data;

      const place = await this.placesRepository.findById(appointment.id_place);

      const appointmentsInMonth =
        await this.appointmentsRepository.findAllInMonth(
          new Date(hours[0].start_date).getMonth() + 1,
        );

      hours.map(async item => {
        appointmentsInMonth.map(existingAppointment => {
          const day = new Date(existingAppointment.start_date).getDate();
          const month = new Date(existingAppointment.start_date).getMonth();
          const year = new Date(existingAppointment.start_date).getFullYear();
          const hour = new Date(existingAppointment.start_date).getHours();
          const minutes = new Date(existingAppointment.start_date).getMinutes();
          const existingCourt = existingAppointment.id_court;

          const finishDay = new Date(existingAppointment.finish_date).getDate();
          const finishMonth = new Date(
            existingAppointment.finish_date,
          ).getMonth();
          const finishYear = new Date(
            existingAppointment.finish_date,
          ).getFullYear();
          const finishHour = new Date(
            existingAppointment.finish_date,
          ).getHours();
          const finishMinutes = new Date(
            existingAppointment.finish_date,
          ).getMinutes();

          const newDay = new Date(item.start_date).getDate();
          const newMonth = new Date(item.start_date).getMonth();
          const newYear = new Date(item.start_date).getFullYear();
          const newHour = new Date(item.start_date).getHours();
          const newMinutes = new Date(item.start_date).getMinutes();
          const newCourt = item.id_court;

          const newFinishDay = new Date(item.finish_date).getDate();
          const newFinishMonth = new Date(item.finish_date).getMonth();
          const newFinishYear = new Date(item.finish_date).getFullYear();
          const newFinishHour = new Date(item.finish_date).getHours();
          const newFinishMinutes = new Date(item.finish_date).getMinutes();

          if (
            day === newDay &&
            month === newMonth &&
            year === newYear &&
            hour === newHour &&
            minutes === newMinutes &&
            existingCourt === newCourt
          ) {
            exitFuncion = true;
          }

          if (
            finishDay === newFinishDay &&
            finishMonth === newFinishMonth &&
            finishYear === newFinishYear &&
            finishHour === newFinishHour &&
            finishMinutes === newFinishMinutes &&
            existingCourt === newCourt
          ) {
            exitFuncion = true;
          }

          return null;
        });

        if (!exitFuncion) {
          const newAppointment =
            await this.appointmentsRepository.createAppointmentHour(
              item,
              appointment,
            );

          if (appointment.id_user > '') {
            await this.appointmentsRepository.createAppointmentUser(
              newAppointment.id,
              appointment.id_user,
            );
          }

          appointmentsToReturn.push(newAppointment);

          if (materials && materials.length > 0) {
            const filteredMaterials = materials.filter(
              material => material.id_hour === item.id,
            );

            filteredMaterials.map(async item2 => {
              await this.appointmentsRepository.createAppointmentMaterial(
                item2,
                newAppointment.id,
              );
            });
          }
        }
      });

      if (exitFuncion) {
        throw new AppError('Appointment already exists');
      }

      if (appointment.finalPrice > 0) {
        let emailText = 'Horários:<br/>';
        hours.map(item => {
          const date = `Data: ${format(
            new Date(item.start_date),
            'dd/MM/yyyy',
          )}`;
          const emailHours = `De: ${format(
            new Date(item.start_date),
            'HH:mm',
          )} às ${format(new Date(item.finish_date), 'HH:mm')}`;

          emailText += `<br/>${date}<br/>${item.court_name}<br/>${emailHours}<br/>Número de jogadores: ${item.number_of_players}<br/><br/>Materiais:<br/>`;

          if (materials && materials.length > 0) {
            const hourMaterials = materials.filter(
              material => material.id_hour === item.id,
            );

            hourMaterials.map(hourMaterial => {
              emailText += `${hourMaterial.material} - ${hourMaterial.amount}<br/>`;
              return null;
            });
          }

          emailText += '<br/>';
          return null;
        });

        const appointmentCreatedTemplate = path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'emails',
          'AppointmentCreated',
          `${process.env.CLIENT}.hbs`,
        );
        if (false) {
          await this.mailProvider.sendMail({
            to: {
              name: appointment.user_name,
              email: appointment.email,
            },
            subject: 'Reserva concluída com sucesso!',
            templateData: {
              file: appointmentCreatedTemplate,
              variables: {
                text: emailText,
              },
            },
          });
        }
      }

      if (String(process.env.NOTIFICATION) === 'YES') {
        const notificationIds = adminUsers.map(item => item.one_signal_id);
        const start_date = `Início: ${format(
          new Date(hours[0].start_date),
          'dd/MM/yyyy HH:mm',
        )}`;
        const finish_date = `Fim: ${format(
          new Date(hours[0].finish_date),
          'dd/MM/yyyy HH:mm',
        )}`;
        const title = `Nova Reserva - ${appointment.user_name} - ${place.name}`;
        const notificationMessage = `${hours[0].court_name}\n${start_date}\n${finish_date}`;
        SpecificsNotification(notificationIds, title, notificationMessage);

        adminUsers.map(item => {
          WhatsAppNotification(
            item.cellphone,
            `${title}\n${notificationMessage}`,
          );
          return null;
        });
      }
      return appointmentsToReturn;
    } catch (error) {
      throw new Error();
    }
  }
}
export default CreateAppointmentservice;
