import express from 'express';
import diagnosisService from '../services/diagnosisService';
import { Diagnosis } from '../types';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('Fetching all diagnoses!');
  const diagnoses = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

router.get('/:id', (req, res: Response<Diagnosis>) => {
  console.log('fetching single diagnosis!');
  const code = req.params.id;
  const diagnosis = diagnosisService.getDiagnosis(code);
  res.send(diagnosis);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;
