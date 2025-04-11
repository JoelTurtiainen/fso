interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);

const getRatingDescription = (rating: number) => {
  if (rating < 1.5) return 'failed';
  if (rating < 2) return 'not too bad but could be better';
  if (rating < 2.5) return 'mediocre';
  if (rating < 3) return 'excellent';
  return 'perfect!';
};

const calculateExercises = (target: number, hours: number[]): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const success = target >= periodLength;
  const average = hours.reduce((prev, curr) => prev + curr) / periodLength;
  const rating = Math.round(clamp((average / target) * 3, 1, 3) * 100) / 100;
  const ratingDescription = getRatingDescription(rating);

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

const test = calculateExercises(2, [2, 0, 3, 1.5, 3, 0, 4]);
console.log(test);
