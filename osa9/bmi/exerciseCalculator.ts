import { clamp, isNotNumber } from './utils';

interface exerciseValues {
  target: number;
  exerciseDays: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!args.slice(3).some((arg) => isNotNumber(arg))) {
    return {
      target: Number(args[2]),
      exerciseDays: args.slice(3).map((val) => Number(val)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

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

try {
  const { target, exerciseDays } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, exerciseDays));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
