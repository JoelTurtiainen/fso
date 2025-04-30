import patientsData from '../../data/patientsData';
import { Patient, NonSensitivePatientData, NewPatientEntry, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const currPatient = patients.find((patient) => patient.id === patientId);
  if (!currPatient) {
    throw new Error("Couldn't find patient");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  currPatient.entries.push(newEntry);
  return newEntry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  getNonSensitivePatients,
  addEntry,
};
