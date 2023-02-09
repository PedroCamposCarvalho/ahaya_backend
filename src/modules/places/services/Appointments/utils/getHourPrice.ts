export default (hour: number, dayOfWeek: number): number => {
  if (dayOfWeek === 0) {
    return 170;
  }
  switch (hour) {
    case 7:
      return 170;
    case 8:
      return 170;
    case 9:
      return 170;
    case 10:
      return 170;
    case 11:
      return 170;
    case 12:
      return 170;
    case 13:
      return 100;
    case 14:
      return 100;
    case 15:
      return 100;
    case 16:
      return 100;
    case 17:
      return 170;
    case 18:
      return 170;
    case 19:
      return 170;
    case 20:
      return 170;
    case 21:
      return 170;
    default:
      return 170;
  }
};
