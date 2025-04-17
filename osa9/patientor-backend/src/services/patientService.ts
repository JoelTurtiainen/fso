import patientsData from "../../data/patientsData";
import { Patient, NonSensitivePatientData, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
};
