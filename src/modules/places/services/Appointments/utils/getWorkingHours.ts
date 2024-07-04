export default (dayOfWeek: number): number[] => {
  const arrayToReturn: number[] = [];

  const initialHour = dayOfWeek === 6 ? 8 : 7;

  for (let i = initialHour; i < 25; i++) {
    arrayToReturn.push(i);
  }

  return arrayToReturn;
};
