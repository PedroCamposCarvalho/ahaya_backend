export default (dayOfWeek: number): number[] => {
  const initialHour = dayOfWeek === 6 || dayOfWeek === 0 ? 9.0 : 7.0;

  const finalHour = 21.0;

  const arrayToReturn: number[] = [initialHour];

  let i = initialHour;

  while (i < finalHour) {
    if (i % 1 === 0) {
      i += 1.3;
    } else {
      i += 2;
      i -= 0.3;
    }
    arrayToReturn.push(i);
  }

  return arrayToReturn;
};
