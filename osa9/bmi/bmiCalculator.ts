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

console.log(calculateBmi(179, 70));
