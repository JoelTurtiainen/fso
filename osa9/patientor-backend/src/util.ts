import { z } from 'zod';
import {
  Diagnosis,
  Gender,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
} from './types';

export const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const newEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const hospitalSchema = newEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string().date(), criteria: z.string() }),
});

export const healthCheckSchema = newEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number(),
});

export const occupationalHealthcareSchema = newEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string().date(), endDate: z.string().date() }).optional(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export const toNewDiagnosisEntry = (object: unknown): Diagnosis => {
  return diagnosisSchema.parse(object);
};

export const toNewHospitalEntry = (object: unknown): HospitalEntry => {
  return hospitalSchema.parse(object);
};

export const toNewHealthCheckEntry = (object: unknown): HealthCheckEntry => {
  return healthCheckSchema.parse(object);
};

export const toNewOccupationalHealthcareEntry = (object: unknown): OccupationalHealthcareEntry => {
  return occupationalHealthcareSchema.parse(object);
};

export default toNewPatientEntry;
