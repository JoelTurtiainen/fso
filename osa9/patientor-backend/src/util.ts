import { z } from 'zod';
import { Gender, NewPatientEntry } from './types';

export const entrySchema = z.object({
  id: z.string().optional(),
});

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatientEntry;
