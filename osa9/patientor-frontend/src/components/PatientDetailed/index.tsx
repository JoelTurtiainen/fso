import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Hospital from "./entries/Hospital";
import OccupationalHealthcare from "./entries/OccupationalHealthcare";
import HealthCheck from "./entries/HealthCheck";
import { assertNever } from "../../utils";

const PatientDetailed = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    if (!patient) return;

    const fetchDiagnoses = async (patient: Patient) => {
      const diag = await diagnosisService.getAll();
      const diagCodes = patient.entries.flatMap((entry) => entry.diagnosisCodes);

      if (!diagCodes) return;

      setDiagnoses(diag.filter((d) => diagCodes.includes(d.code)));
    };
    void fetchDiagnoses(patient);
  }, [patient]);

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
      case "Hospital":
        return <Hospital style={style} entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare style={style} entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheck style={style} entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  if (!patient) {
    return <div>patient not found</div>;
  }

  console.log(diagnoses);

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

      <div>
        <h2>entries</h2>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetailed;
