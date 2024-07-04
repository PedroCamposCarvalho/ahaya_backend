import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import AppointmentsController from '../controllers/Appointments/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.post(
  '/create',
  ensureAtuthenticated,
  appointmentsController.create,
);

appointmentsRouter.post(
  '/createScore',
  ensureAtuthenticated,
  appointmentsController.createScore,
);

appointmentsRouter.get(
  '/findByID',
  ensureAtuthenticated,
  appointmentsController.findById,
);

appointmentsRouter.delete(
  '/deleteAppointment',
  ensureAtuthenticated,
  appointmentsController.deleteAppointment,
);

appointmentsRouter.get(
  '/sendScheduleNotification',
  appointmentsController.sendScheduledNotifitcation,
);

appointmentsRouter.delete(
  '/deleteMonthlyAppointments',
  ensureAtuthenticated,
  appointmentsController.deleteMonthlyAppointments,
);

appointmentsRouter.get(
  '/findDayAvailability',
  ensureAtuthenticated,
  appointmentsController.findDayAvailability,
);

appointmentsRouter.get(
  '/findDayAvailabilityTemp',
  ensureAtuthenticated,
  appointmentsController.findDayAvailability_temp,
);

appointmentsRouter.get(
  '/findCalendarEvents',
  ensureAtuthenticated,
  appointmentsController.findCalendarEvents,
);

appointmentsRouter.get(
  '/findUserHistory',
  ensureAtuthenticated,
  appointmentsController.findUserHistory,
);

appointmentsRouter.get(
  '/findAppointmentMaterials',
  ensureAtuthenticated,
  appointmentsController.findAppointmentMaterials,
);

appointmentsRouter.get(
  '/findAgenda',
  ensureAtuthenticated,
  appointmentsController.findAgendaAppointments,
);

appointmentsRouter.get(
  '/findAgendaAppointment',
  ensureAtuthenticated,
  appointmentsController.findAgendaAppointment,
);

appointmentsRouter.get(
  '/findWebReport',
  ensureAtuthenticated,
  appointmentsController.findWebReport,
);

appointmentsRouter.get(
  '/schedulePixPayment',
  appointmentsController.schedulePixPayment,
);

appointmentsRouter.post(
  '/createPrice',
  ensureAtuthenticated,
  appointmentsController.createPrice,
);

appointmentsRouter.post(
  '/copyPrice',
  ensureAtuthenticated,
  appointmentsController.copyPrice,
);

appointmentsRouter.put(
  '/editPrice',
  ensureAtuthenticated,
  appointmentsController.editPrice,
);

appointmentsRouter.delete(
  '/deletePrice',
  ensureAtuthenticated,
  appointmentsController.deletePrice,
);

appointmentsRouter.post(
  '/createPriceException',
  ensureAtuthenticated,
  appointmentsController.createPriceException,
);

appointmentsRouter.get(
  '/findExceptionsByCourt',
  ensureAtuthenticated,
  appointmentsController.findExceptionsByCourt,
);

appointmentsRouter.delete(
  '/deletePriceException',
  ensureAtuthenticated,
  appointmentsController.deletePriceException,
);

appointmentsRouter.get(
  '/findPricesByCourt',
  ensureAtuthenticated,
  appointmentsController.findPricesByCourt,
);

appointmentsRouter.put(
  '/editAppointment',
  ensureAtuthenticated,
  appointmentsController.editAppointment,
);

export default appointmentsRouter;
