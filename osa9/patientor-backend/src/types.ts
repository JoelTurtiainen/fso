import { z } from 'zod';
import {
  diagnosisSchema,
  healthCheckSchema,
  hospitalSchema,
  newPatientSchema,
  occupationalHealthcareSchema,
} from './util';

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type HospitalEntry = z.infer<typeof hospitalSchema>;
export type HealthCheckEntry = z.infer<typeof healthCheckSchema>;
export type OccupationalHealthcareEntry = z.infer<typeof occupationalHealthcareSchema>;
export type Diagnosis = z.infer<typeof diagnosisSchema>;
