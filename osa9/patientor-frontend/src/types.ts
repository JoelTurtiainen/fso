export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  Hospital = "Hospital",
  OcucpationalHealthCare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OcucpationalHealthCare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

type BaseEntryType = {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

type HospitalEntryType =
  | {
      type: EntryType.Hospital;
      discharge: {
        date: string;
        criteria: string;
      };
    }
  | BaseEntryType;

export type Entry = HospitalEntryType; //| OccupationalHealthcareEntry | HealthCheckEntry;
export type newEntry = UnionOmit<Entry, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
