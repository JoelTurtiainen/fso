import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Entry, EntryType, Gender, NewEntry, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Hospital from "./entries/Hospital";
import OccupationalHealthcare from "./entries/OccupationalHealthcare";
import HealthCheck from "./entries/HealthCheck";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";

const PatientDetailed = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);
  const [patientDiagnoses, setPatientDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>("");
  const id = useParams().id;
  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const submitNewEntry = async (values: NewEntry) => {
    if (!patient || !("entries" in patient)) return;
    try {
      const newEntry = await patientService.createEntry(values, patient.id);
      const newPatient = { ...patient };
      newPatient.entries.push(newEntry);
      setPatient(newPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
          if (typeof e?.response?.data === "string") {
            const message = e.response.data.replace("Something went wrong. Error: ", "");
            console.error(message);
            notify(message);
          } else if (typeof e?.response?.data === "object") {
            const { message, path }: { message: string; path: string[] } = e.response.data.error[0];
            const errorMessage = `${path[0]} ${message.substring(message.indexOf(" ") + 1)}`;
            console.error(e.response.data.error[0]);
            notify(errorMessage);
          }
        } else {
          console.log(e);
          notify("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        notify("Unknown error");
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    void fetchPatient();
    const fetchDiagnoses = async () => {
      const diag = await diagnosisService.getAll();
      typeof diag === typeof allDiagnoses ? setAllDiagnoses(diag) : [];
    };

    void fetchDiagnoses();
  }, [id]);

  useEffect(() => {
    if (!patient) return;
    const diagCodes = patient.entries.flatMap((entry) => entry.diagnosisCodes);
    if (!diagCodes) return;
    setPatientDiagnoses(allDiagnoses.filter((d) => diagCodes.includes(d.code)));
  }, [allDiagnoses, patient]);

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <QuestionMarkIcon />;
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    if (!patient) return;

    const style = {
      border: "2px solid black",
      borderRadius: "10px",
      padding: "10px",
    } as React.CSSProperties;

    switch (entry.type) {
      case EntryType.Hospital:
        return <Hospital style={style} entry={entry} diagnoses={patientDiagnoses} />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthcare style={style} entry={entry} diagnoses={patientDiagnoses} />;
      case EntryType.HealthCheck:
        return <HealthCheck style={style} entry={entry} diagnoses={patientDiagnoses} />;
      default:
        return;
    }
  };

  if (!patient) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h2>
        {patient.name}
        {genderIcon(patient.gender)}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={submitNewEntry} allDiagnoses={allDiagnoses} />
      <div>
        <h2>entries</h2>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetailed;
