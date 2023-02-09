import ExperimentalClass from '../infra/typeorm/entities/ExperimentalClass';
import ExperimentalClassConfig from '../infra/typeorm/entities/ExperimentalClassConfig';
import ExperimentalClassUsers from '../infra/typeorm/entities/ExperimentalClassUsers';
import ExperimentalClassException from '../infra/typeorm/entities/ExperimentalClassException';
import ICreateExperimentalClassDTO from '../dtos/ICreateExperimentalClassDTO';
import ICreateExperimentalClassUsersDTO from '../dtos/ICreateExperimentalClassUsersDTO';
import ICreateConfigClassDTO from '../dtos/ICreateConfigClassDTO';
import IEditConfigClassDTO from '../dtos/IEditConfigClassDTO';
import ICreateExceptionDayDTO from '../dtos/ICreateExceptionDayDTO';
import IFindByIdServiceDTO from '../dtos/IFindByIdServiceDTO';

export default interface IExperimentalClassRepository {
  create(data: ICreateExperimentalClassDTO): Promise<ExperimentalClass>;
  createByClassesConfig(
    data: ICreateExperimentalClassDTO,
  ): Promise<ExperimentalClass>;
  findByDate(date: Date): Promise<ExperimentalClass | undefined>;
  createUser(
    data: ICreateExperimentalClassUsersDTO,
  ): Promise<ExperimentalClassUsers>;
  findUsersByList(
    id_experimentalclass: string,
  ): Promise<ExperimentalClassUsers[]>;
  findByToken(token: string): Promise<ExperimentalClass>;
  findExperimentalClassAvailability(
    id_experimentalclass: string,
  ): Promise<number>;
  deleteUser(id_user: string, id_experimentalclass: string): Promise<void>;
  findAll(id_place: string, past: boolean): Promise<ExperimentalClass[]>;
  findByIdPlace(id_place: string): Promise<ExperimentalClass>;
  findAllByUser(id_user: string): Promise<ExperimentalClassUsers[]>;
  verifyUserIsInList(
    id_experimentalclass: string,
    id_user: string,
  ): Promise<boolean>;
  findById(id_experimentalclass: string): Promise<IFindByIdServiceDTO>;
  createConfigClass(
    data: ICreateConfigClassDTO,
  ): Promise<ExperimentalClassConfig>;
  findAllConfigDays(): Promise<ExperimentalClassConfig[]>;
  findCreatedClasses(): Promise<ExperimentalClass[]>;
  deleteConfigClass(id_class: string): Promise<boolean>;
  editConfigClass(data: IEditConfigClassDTO): Promise<ExperimentalClassConfig>;
  findAllUnpaidUsers(): Promise<ExperimentalClassUsers[]>;
  updatePaidUser(
    id_experimentalclass_user: string,
  ): Promise<ExperimentalClassUsers>;
  deleteClass(id_class: string): Promise<ExperimentalClass>;
  findExceptionsByPlace(
    id_place: string,
  ): Promise<ExperimentalClassException[]>;
  createExceptionDay(
    data: ICreateExceptionDayDTO,
  ): Promise<ExperimentalClassException>;
  deleteExceptionDay(
    id_exceptionDay: string,
  ): Promise<ExperimentalClassException>;
  findAllExceptions(): Promise<ExperimentalClassException[]>;
}
