import { container } from 'tsyringe';
import '@modules/users/providers';
import './Providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IPlacesRepository from '@modules/places/repositories/Places/IPlacesRepository';
import PlacesRepository from '@modules/places/infra/typeorm/repositories/Places/PlacesRepository';

import ICourtsRepository from '@modules/places/repositories/Courts/ICourtsRepository';
import CourtsRepository from '@modules/places/infra/typeorm/repositories/Courts/CourtsRepository';

import ICreditCardsRepository from '@modules/places/repositories/CreditCards/ICreditCardsRepository';
import CreditCardsRepository from '@modules/places/infra/typeorm/repositories/CreditCard/CreditCardsRepository';

import ISportsRepository from '@modules/places/repositories/Sports/ISportsRepository';
import SportsRepository from '@modules/places/infra/typeorm/repositories/Sports/SportsRepository';

import IMaterialsRepository from '@modules/places/repositories/Materials/IMaterialsRepository';
import MaterialsRepository from '@modules/places/infra/typeorm/repositories/Materials/MaterialsRepository';

import IAppointmentsRepository from '@modules/places/repositories/Appointments/IAppointmentsRepository';
import AppointmentsRepository from '@modules/places/infra/typeorm/repositories/Appointment/AppointmentsRepository';

import IPaymentDataRepository from '@modules/places/repositories/PaymentData/IPaymentDataRepository';
import PaymentDataRepository from '@modules/places/infra/typeorm/repositories/PaymentData/PaymentDataRepository';

import ITermsConditionsRepository from '@modules/places/repositories/TermsConditions/ITermsConditionsRepository';
import TermsConditionsRepository from '@modules/places/infra/typeorm/repositories/TermsConditions/TermsConditionsRepository';

import IUserTypesRepository from '@modules/users/repositories/IUserTypesRepository';
import UserTypesRepository from '@modules/users/infra/typeorm/repositories/UserTypesRepository';

import IVouchersRepository from '@modules/vouchers/repositories/IVouchersRepository';
import VouchersRepository from '@modules/vouchers/infra/typeorm/repositories/VouchersRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';

import IStoreRepository from '@modules/store/repositories/IStoreRepository';
import StoreRepository from '@modules/store/infra/typeorm/repositories/StoreRepository';

import IClubRepository from '@modules/club/repositories/IClubRepository';
import ClubRepository from '@modules/club/infra/typeorm/repositories/ClubRepository';

import IInterestsRepository from '@modules/interests/repositories/IInterestsRepository';
import InterestRepository from '@modules/interests/infra/typeorm/repositories/InterestRepository';

import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import TeacherRepository from '@modules/teachers/infra/typeorm/repositories/TeacherRepository';

import IPayersRepository from '@modules/payers/repositories/IPayersRepository';
import PayersRepository from '@modules/payers/infra/typeorm/repositories/PayersRepository';

import IMonthlyRepository from '@modules/monthly/repositories/IMonthlyRepository';
import MonthlyRepository from '@modules/monthly/infra/typeorm/repositories/MonthlyRepository';

import IChatRepository from '@modules/chat/repositories/IChatRepository';
import ChatRepository from '@modules/chat/infra/typeorm/repositories/ChatRepository';

import IDayUseRepository from '@modules/day_use/repositories/IDayUseRepository';
import DayUseRepository from '@modules/day_use/infra/typeorm/repositories/DayUseRepository';
import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import TournamentsRepository from '@modules/places/infra/typeorm/repositories/Tournaments/TournamentsRepository';

import IMonthlyUserMissedDaysRepository from '@modules/monthly/repositories/IMonthlyUserMissedDaysRepository';
import MonthlyUserMissedDaysRepository from '@modules/monthly/infra/typeorm/repositories/MonthlyUserMissedDaysRepository';

import IPrivacyPolicyRepository from '@modules/privacy_policy/repositories/IPrivacyPolicyRepository';
import PrivacyPolicyRepository from '@modules/privacy_policy/infra/typeorm/repositories/PrivacyPolicyRepository';

import IExperimentalClassRepository from '@modules/experimental_classes/repositories/IExperimentalClassRepository';
import ExperimentalClassRepository from '@modules/experimental_classes/infra/typeorm/repositories/ExperimentalClassRepository';

import ICancelationRulesRepository from '@modules/cancelation_rules/repositories/ICancelationRulesRepository';
import CancelationRulesRepository from '@modules/cancelation_rules/infra/typeorm/repositories/CancelationRulesRepository';

import IScoreRepository from '@modules/score/repositories/IScoreRepository';
import ScoreRepository from '@modules/score/infra/typeorm/repositories/ScoreRepository';

container.registerSingleton<IScoreRepository>(
  'ScoreRepository',
  ScoreRepository,
);

container.registerSingleton<ICancelationRulesRepository>(
  'CancelationRulesRepository',
  CancelationRulesRepository,
);

container.registerSingleton<IExperimentalClassRepository>(
  'ExperimentalClassRepository',
  ExperimentalClassRepository,
);

container.registerSingleton<IPrivacyPolicyRepository>(
  'PrivacyPolicyRepository',
  PrivacyPolicyRepository,
);

container.registerSingleton<IChatRepository>('ChatRepository', ChatRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMonthlyUserMissedDaysRepository>(
  'MonthlyUserMissedDaysRepository',
  MonthlyUserMissedDaysRepository,
);

container.registerSingleton<IDayUseRepository>(
  'DayUseRepository',
  DayUseRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPlacesRepository>(
  'PlacesRepository',
  PlacesRepository,
);

container.registerSingleton<ICourtsRepository>(
  'CourtsRepository',
  CourtsRepository,
);

container.registerSingleton<ICreditCardsRepository>(
  'CreditCardsRepository',
  CreditCardsRepository,
);

container.registerSingleton<ISportsRepository>(
  'SportsRepository',
  SportsRepository,
);

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IPaymentDataRepository>(
  'PaymentDataRepository',
  PaymentDataRepository,
);

container.registerSingleton<ITermsConditionsRepository>(
  'TermsConditionsRepository',
  TermsConditionsRepository,
);

container.registerSingleton<IUserTypesRepository>(
  'UserTypesRepository',
  UserTypesRepository,
);

container.registerSingleton<IVouchersRepository>(
  'VouchersRepository',
  VouchersRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<IStoreRepository>(
  'StoreRepository',
  StoreRepository,
);

container.registerSingleton<ITeacherRepository>(
  'TeacherRepository',
  TeacherRepository,
);

container.registerSingleton<IInterestsRepository>(
  'InterestRepository',
  InterestRepository,
);

container.registerSingleton<IClubRepository>('ClubRepository', ClubRepository);

container.registerSingleton<IPayersRepository>(
  'PayersRepository',
  PayersRepository,
);

container.registerSingleton<IMonthlyRepository>(
  'MonthlyRepository',
  MonthlyRepository,
);

container.registerSingleton<ITournamentsRepository>(
  'TournamentsRepository',
  TournamentsRepository,
);
