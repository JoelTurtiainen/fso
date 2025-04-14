import { isNotNumber } from './utils';

interface BmiValues {
  height: number;
  mass: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi < 16) return 'Severe Thinness';
  if (bmi < 17) return 'Moderate Thinness';
  if (bmi < 18.4) return 'Mild Thinness';
  if (bmi < 24.9) return 'Normal Range';
  if (bmi < 29.9) return 'Overweight';
  if (bmi < 34.9) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

try {
  const { height, mass } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
