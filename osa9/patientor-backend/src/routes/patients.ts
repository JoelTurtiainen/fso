import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { NonSensitivePatientData } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  console.log("Fetching all patients!");
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  res.json(addedEntry);
});

export default router;
