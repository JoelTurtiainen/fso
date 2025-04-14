import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
const app = express();
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
