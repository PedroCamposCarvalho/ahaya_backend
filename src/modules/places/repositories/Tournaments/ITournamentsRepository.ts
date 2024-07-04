import ICreateTournamentInscriptionDTO from '@modules/places/dtos/Tournaments/ICreateTournamentInscriptionDTO';
import IReturnInscriptionsDTO from '@modules/places/dtos/Tournaments/IReturnReportInscriptionsDTO';
import TournamentInscriptions from '@modules/places/infra/typeorm/entities/Tournaments/TournamentInscriptions';
import TournamentCategory from '@modules/places/infra/typeorm/entities/Tournaments/TournamentCategory';
import TournamentCategoryTypes from '@modules/places/infra/typeorm/entities/Tournaments/TournamentCategoryTypes';

export default interface ITournamentsRepository {
  createTournamentInscription(
    data: ICreateTournamentInscriptionDTO,
  ): Promise<TournamentInscriptions>;
  findAll(): Promise<TournamentInscriptions[]>;
  isUserStudent(ssn: string): Promise<boolean>;
  findAllCategories(): Promise<TournamentCategory[]>;
  findAllCategoriesTypes(): Promise<TournamentCategoryTypes[]>;
  verifyUserIsSubscribed(id_user: string): Promise<boolean>;
  findAllUnpaidUsers(): Promise<TournamentInscriptions[]>;
  deleteInscription(id_inscription: string): Promise<TournamentInscriptions>;
  updatePaidInscription(
    id_inscription: string,
  ): Promise<TournamentInscriptions>;
  findReportInscriptions(): Promise<IReturnInscriptionsDTO[]>;
}
