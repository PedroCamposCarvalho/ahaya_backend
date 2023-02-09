import { getRepository, Repository } from 'typeorm';

import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import ICreateTournamentInscriptionDTO from '@modules/places/dtos/Tournaments/ICreateTournamentInscriptionDTO';
import IReturnInscriptionsDTO from '@modules/places/dtos/Tournaments/IReturnReportInscriptionsDTO';
import AppError from '@shared/errors/AppError';
import TournamentInscriptions from '../../entities/Tournaments/TournamentInscriptions';
import TournamentCategory from '../../entities/Tournaments/TournamentCategory';
import TournamentCategoryTypes from '../../entities/Tournaments/TournamentCategoryTypes';
import Student from '../../entities/Tournaments/Student';

class TournamentsRepository implements ITournamentsRepository {
  private ormRepository: Repository<TournamentInscriptions>;

  private categoryRepository: Repository<TournamentCategory>;

  private categoryTypeRepository: Repository<TournamentCategoryTypes>;

  private studentRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(TournamentInscriptions);
    this.categoryRepository = getRepository(TournamentCategory);
    this.categoryTypeRepository = getRepository(TournamentCategoryTypes);
    this.studentRepository = getRepository(Student);
  }

  public async createTournamentInscription(
    data: ICreateTournamentInscriptionDTO,
  ): Promise<TournamentInscriptions> {
    const { id_tournament_type, id_user, id_transaction, paid, second_player } =
      data;

    const tournament = this.ormRepository.create({
      id_tournament_type,
      id_user,
      id_transaction,
      paid,
      second_player,
    });
    await this.ormRepository.save(tournament);

    return tournament;
  }

  public async findAll(): Promise<TournamentInscriptions[]> {
    const tournament = await this.ormRepository.find();
    return tournament;
  }

  public async isUserStudent(ssn: string): Promise<boolean> {
    const student = await this.studentRepository.findOne({ where: { ssn } });
    if (!student) {
      return false;
    }
    return true;
  }

  public async findAllCategories(): Promise<TournamentCategory[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  public async findAllCategoriesTypes(): Promise<TournamentCategoryTypes[]> {
    const types = await this.categoryTypeRepository.find();
    return types;
  }

  public async verifyUserIsSubscribed(id_user: string): Promise<boolean> {
    const subscriptions = await this.ormRepository.find({ where: { id_user } });
    if (subscriptions.length > 0) {
      return true;
    }
    return false;
  }

  public async findAllUnpaidUsers(): Promise<TournamentInscriptions[]> {
    const inscriptions = await this.ormRepository.find({
      where: { paid: false },
    });
    return inscriptions;
  }

  public async deleteInscription(
    id_inscription: string,
  ): Promise<TournamentInscriptions> {
    const inscription = await this.ormRepository.findOne({
      where: { id: id_inscription },
    });
    if (!inscription) {
      throw new AppError('User not found');
    }
    await this.ormRepository.remove(inscription);
    return inscription;
  }

  public async updatePaidInscription(
    id_inscription: string,
  ): Promise<TournamentInscriptions> {
    const inscription = await this.ormRepository.findOne({
      where: { id: id_inscription },
    });
    if (!inscription) {
      throw new AppError('User not found');
    }

    inscription.paid = true;

    await this.ormRepository.save(inscription);

    return inscription;
  }

  public async findReportInscriptions(): Promise<IReturnInscriptionsDTO[]> {
    const inscriptions = await this.ormRepository.query(
      `select tou.id, cat.name as type, typ.name as category, use.id as id_user, use.name as user_name, tou.second_player as partner from tournament_inscriptions tou inner join users use on tou.id_user = use.id inner join tournament_categories_types typ on tou.id_tournament_type = typ.id inner join tournament_categories cat on typ.id_tournament_category = cat.id`,
    );

    return inscriptions;
  }
}
export default TournamentsRepository;
