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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export type BaseEntryType = {
  id: string;
  type: EntryType;
  description: string;
  date: string | null;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

type Discharge = {
  date: string | null;
  criteria: string;
};

export type HospitalEntry = {
  type: EntryType.Hospital;
  discharge: Discharge;
};

export type HealthCheck = {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
};

type SickLeave = {
  startDate: string | null;
  endDate: string | null;
};

export type OccupationalHealthcare = {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
};

export type ExtraOptions = HospitalEntry | HealthCheck | OccupationalHealthcare;

export type Entry = BaseEntryType & ExtraOptions;

export type NewEntry = Omit<Entry, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
