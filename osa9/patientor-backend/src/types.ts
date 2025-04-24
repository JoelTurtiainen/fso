import { z } from 'zod';
import { newPatientSchema } from './util';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// }

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}
