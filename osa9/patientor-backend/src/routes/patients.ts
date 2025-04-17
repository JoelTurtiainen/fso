import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { NonSensitivePatientData } from "../types";
import toNewPatientEntry from "../util";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching all patients!");
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
