import { z } from 'zod';
import {
  Diagnosis,
  Gender,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatientEntry,
} from './types';

export const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const newPatientSchema = z.object({
  name: z.string().min(2),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(2),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(2),
});

const newEntrySchema = z.object({
  description: z.string().min(2),
  date: z.string().date(),
  specialist: z.string().min(2),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const hospitalSchema = newEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string().date(), criteria: z.string() }),
});

export const healthCheckSchema = newEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().gte(0).lte(3),
});

export const occupationalHealthcareSchema = newEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(2),
  sickLeave: z.object({ startDate: z.string().date(), endDate: z.string().date() }).optional(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export const toNewDiagnosisEntry = (object: unknown): Diagnosis => {
  return diagnosisSchema.parse(object);
};

export const toNewHospitalEntry = (object: unknown): NewHospitalEntry => {
  return hospitalSchema.parse(object);
};

export const toNewHealthCheckEntry = (object: unknown): NewHealthCheckEntry => {
  return healthCheckSchema.parse(object);
};

export const toNewOccupationalHealthcareEntry = (object: unknown): NewOccupationalHealthcareEntry => {
  return occupationalHealthcareSchema.parse(object);
};

export default toNewPatientEntry;
