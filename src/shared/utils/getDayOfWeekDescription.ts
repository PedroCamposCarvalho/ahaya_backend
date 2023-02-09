interface ReturnProps {
  day: string;
  suffix: string;
}

export default (day: number): ReturnProps => {
  switch (day) {
    case 0:
      return { day: 'Domingo', suffix: 'o' };
    case 1:
      return { day: 'Segunda', suffix: 'a' };
    case 2:
      return { day: 'Terça', suffix: 'a' };
    case 4:
      return { day: 'Quinta', suffix: 'a' };
    case 5:
      return { day: 'Sexta', suffix: 'a' };
    case 6:
      return { day: 'Sábado', suffix: '0' };
    default:
      return { day: '', suffix: '' };
  }
};
