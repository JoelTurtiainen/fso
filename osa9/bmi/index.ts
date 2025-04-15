import express from 'express';
import { isNotNumber } from './src/utils';
import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises } from './src/exerciseCalculator';
const app = express();

app.use(express.json());
app.set('query parser', 'simple');

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNotNumber(height) && !isNotNumber(weight)) {
    res.json({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.json({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.json({ error: 'parameters missing' });
    return;
  }

  if (daily_exercises instanceof Array && !daily_exercises.some((day) => isNotNumber(day))) {
    if (!daily_exercises.some((arg) => isNotNumber(arg))) {
      const exercises: number[] = daily_exercises.map((day) => Number(day));
      res.json(calculateExercises(Number(target), exercises));
      return;
    }
  }
  res.json({
    error: 'malformatted parameters',
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
