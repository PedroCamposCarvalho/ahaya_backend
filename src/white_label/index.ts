import ProjectProps from './dtos/ProjectProps';
import Ahaya from './Ahaya';
import Jardins from './Jardins';
import Calango from './Calango';

export default (): ProjectProps => {
  switch (String(process.env.CLIENT)) {
    case 'Ahaya':
      return Ahaya;
    case 'Jardins':
      return Jardins;
    case 'Calango':
      return Calango;
    default:
      return Ahaya;
  }
};
