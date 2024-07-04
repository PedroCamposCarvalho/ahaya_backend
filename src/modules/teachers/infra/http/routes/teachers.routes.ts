/* eslint-disable func-names */
import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import TeacherController from '../controllers/TeacherController';

const teacherRouter = Router();
const upload = multer(uploadConfig.multer);
const teacherController = new TeacherController();

teacherRouter.get('/createWeekClasses', teacherController.createWeekClasses);

teacherRouter.post(
  '/createWeekClasseUser',
  ensureAtuthenticated,
  teacherController.createWeekClassUser,
);

teacherRouter.get(
  '/findAvailableClassesByWeekNumber',
  ensureAtuthenticated,
  teacherController.findAvailableClassesByWeekNumber,
);

teacherRouter.get(
  '/findAllTeachers',
  ensureAtuthenticated,
  teacherController.findAllTeachers,
);

teacherRouter.patch(
  '/photo',
  ensureAtuthenticated,
  upload.single('photo'),
  teacherController.updatePhoto,
);

teacherRouter.get(
  '/findTeacherById',
  ensureAtuthenticated,
  teacherController.findTeacherById,
);

teacherRouter.put(
  '/updateTeacherDescription',
  ensureAtuthenticated,
  teacherController.updateDescription,
);

teacherRouter.post(
  '/createTeacherClass',
  ensureAtuthenticated,
  teacherController.createTeacherClass,
);

teacherRouter.get(
  '/findTeacherClasses',
  ensureAtuthenticated,
  teacherController.findTeacherClasses,
);

teacherRouter.post(
  '/createClassUser',
  ensureAtuthenticated,
  teacherController.createUserClass,
);

teacherRouter.get(
  '/userTickets',
  ensureAtuthenticated,
  teacherController.findUserTickets,
);

teacherRouter.get(
  '/classUsers',
  ensureAtuthenticated,
  teacherController.findClassUsers,
);

teacherRouter.get(
  '/findTicketById',
  ensureAtuthenticated,
  teacherController.findTicketById,
);

teacherRouter.put(
  '/updateTicketUser',
  ensureAtuthenticated,
  teacherController.updateTicketUser,
);

teacherRouter.post(
  '/createTeacher',
  ensureAtuthenticated,
  teacherController.createTeacher,
);

teacherRouter.delete(
  '/cancelClass',
  ensureAtuthenticated,
  teacherController.cancelClass,
);

teacherRouter.put(
  '/retrieveTicket',
  ensureAtuthenticated,
  teacherController.retrieveTicket,
);

teacherRouter.get(
  '/findAvailableCourtsToCreateClass',
  ensureAtuthenticated,
  teacherController.findAvailableCourtsToCreateClass,
);

teacherRouter.get(
  '/findClassById',
  ensureAtuthenticated,
  teacherController.findClassById,
);

teacherRouter.put(
  '/updateTeacherClass',
  ensureAtuthenticated,
  teacherController.updateTeacherClass,
);

teacherRouter.get(
  '/findUsersClasses',
  ensureAtuthenticated,
  teacherController.findUsersClasses,
);

teacherRouter.get(
  '/scheduleCreateClassService',
  teacherController.scheduleCreateClassService,
);

teacherRouter.get('/findClassDetails', teacherController.findClassDetails);

teacherRouter.delete(
  '/removeUserFromClass',
  teacherController.removeUserFromClass,
);

export default teacherRouter;
