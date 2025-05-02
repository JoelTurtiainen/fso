import express from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { Response } from 'express';
import { NewEntry, NonSensitivePatientData, Patient } from '../types';
import toNewPatientEntry, {
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
} from '../util';

interface RequestHeaders {
  body: NewEntry;
  params: { id: string };
}

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log('Fetching all patients!');
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req, res: Response<Patient>) => {
  console.log('fetching single patient!');
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req: RequestHeaders, res) => {
  console.log('posting new entry for a patient!');
  const patientId = req.params.id;

  let newEntry;
  try {
    switch (req.body.type) {
      case 'Hospital':
        newEntry = toNewHospitalEntry(req.body);
        break;
      case 'OccupationalHealthcare':
        newEntry = toNewOccupationalHealthcareEntry(req.body);
        break;
      case 'HealthCheck':
        newEntry = toNewHealthCheckEntry(req.body);
        break;
      default:
        res.status(400).send();
        return;
    }
    const addedEntry = patientService.addEntry(newEntry, patientId);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
