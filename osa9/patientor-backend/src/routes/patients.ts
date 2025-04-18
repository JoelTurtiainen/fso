import express from "express";
import patientService from "../services/patientService";
import { z } from "zod";
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
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
