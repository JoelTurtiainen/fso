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

export type NewEntry = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export type NewHospitalEntry = z.infer<typeof hospitalSchema>;
export type NewHealthCheckEntry = z.infer<typeof healthCheckSchema>;
export type NewOccupationalHealthcareEntry = z.infer<typeof occupationalHealthcareSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}
export interface HospitalEntry extends NewHospitalEntry {
  id: string;
}
export interface HealthCheckEntry extends NewHealthCheckEntry {
  id: string;
}
export interface OccupationalHealthcareEntry extends NewOccupationalHealthcareEntry {
  id: string;
}

export type Diagnosis = z.infer<typeof diagnosisSchema>;
