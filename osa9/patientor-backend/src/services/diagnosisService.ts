import diagnosesData from '../../data/diagnosesData';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosis = (code: string): Diagnosis | undefined => {
  const diagnosis = diagnoses.find((d) => d.code === code);
  return diagnosis;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  getDiagnosis,
  addDiagnosis,
};
