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

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
