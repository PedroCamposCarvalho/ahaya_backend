import { injectable, inject } from 'tsyringe';
import ICourtsSportsDTO, {
  ISportsDTO,
} from '../../dtos/Courts/ICourtsSportsDTO';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindCourtsBySportId {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(id_place: string): Promise<ICourtsSportsDTO[]> {
    const courts = await this.courtsRepository.getAll(id_place);
    const courtSport = await this.courtsRepository.findCourtSport();
    const sports = await this.sportsRepository.findAll();

    const data: ICourtsSportsDTO[] = [];

    courts.map(item => {
      const newSportItem: ISportsDTO[] = [];
      courtSport.map(item2 => {
        if (item2.court_id === item.id) {
          newSportItem.push({
            id: item2.sport_id,
            name: sports.filter(item3 => item3.id === item2.sport_id)[0].name,
          });
        }
        return null;
      });
      const newItem: ICourtsSportsDTO = {
        id: item.id,
        name: item.name,
        sports: newSportItem,
      };
      data.push(newItem);
      return null;
    });

    return data;
  }
}

export default FindCourtsBySportId;
