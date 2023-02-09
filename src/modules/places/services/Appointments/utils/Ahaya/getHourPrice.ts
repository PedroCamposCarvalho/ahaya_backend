export default (
  hour: number,
  dayOfWeek: number,
  id_sport: string,
  day: number,
  month: number,
  year: number,
): number => {
  if (id_sport === 'ce480098-8aa5-4c60-9452-dc8cc24d2468') {
    if (month >= 9 || year > 2022) {
      if (dayOfWeek === 6) {
        return 130;
      }
      if (hour <= 14) {
        return 75;
      }
      return 130;
    }
    if (dayOfWeek === 6) {
      return 120;
    }
    if (hour >= 15) {
      return 120;
    }
    return 70;
  }
  if (month >= 9 || year > 2022) {
    if (dayOfWeek === 6) {
      return 70;
    }
    if (hour <= 14) {
      return 40;
    }
    if (hour > 14 && hour < 18) {
      return 60;
    }
    return 90;
  }

  if (id_sport === 'ce480098-8aa5-4c60-9452-dc8cc24d2468') {
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return 120;
    }
    if (hour >= 7 && hour <= 14) {
      return 70;
    }
    return 120;
  }
  if (id_sport === '5dd4d849-01a0-4170-b957-d79ebce4221c') {
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return 60;
    }
    if (hour >= 7 && hour <= 14) {
      return 30;
    }
    if (hour >= 18) {
      return 80;
    }
    return 50;
  }

  if (id_sport === '06e054ac-2b86-4cd2-a0bb-4f7595d955fd') {
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return 60;
    }
    if (hour >= 7 && hour <= 14) {
      return 30;
    }
    if (hour >= 18) {
      return 80;
    }
    return 50;
  }

  if (id_sport === '3d3f1f6b-df27-493d-b5ce-c52a3fb66042') {
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return 60;
    }
    if (hour >= 7 && hour <= 14) {
      return 30;
    }
    if (hour >= 18) {
      return 80;
    }
    return 50;
  }
  return 0;
};
