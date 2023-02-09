import { injectable, inject } from 'tsyringe';
import IReturnWebPlacesPropsDTO from '../../dtos/Places/IReturnWebPlacesPropsDTO';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

@injectable()
class GetPlacesService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute(): Promise<IReturnWebPlacesPropsDTO> {
    const client = String(process.env.CLIENT);

    switch (client) {
      case 'Jardins':
        return {
          id_place: '',
          logo: 'https://app-jardins.s3.amazonaws.com/logo.png',
          backgroundUrl:
            'https://app-ahaya.s3.amazonaws.com/sand_background.jpg',
          name: 'Arena Beach Jardins',
          primaryColor: '#004774',
          secondaryColor: '#ff923c',
          options: [
            'Home',
            'Calendario',
            'Clientes',
            'Day Use',
            'Esportes',
            'Preços',
            'Quadras',
            'Política de privacidade',
            'Relatórios',
          ],
        };
      case 'Ahaya':
        return {
          id_place: '',
          logo: 'https://app-ahaya.s3.amazonaws.com/logowhite.png',
          backgroundUrl:
            'https://app-ahaya.s3.amazonaws.com/sand_background.jpg',
          name: 'Ahaya Beach Sports',
          primaryColor: '#006edb',
          secondaryColor: '#5c5c5c',
          options: ['Calendario', 'Relatórios'],
        };

      case 'Calango':
        return {
          id_place: '',
          logo: 'https://app-calango.s3.amazonaws.com/logo.png',
          backgroundUrl:
            'https://app-ahaya.s3.amazonaws.com/sand_background.jpg',
          name: 'Ahaya Beach Sports',
          primaryColor: '#222221',
          secondaryColor: '#5c5c5c',
          options: ['Calendario', 'Relatórios'],
        };

      default:
        throw new Error();
    }
  }
}

export default GetPlacesService;
