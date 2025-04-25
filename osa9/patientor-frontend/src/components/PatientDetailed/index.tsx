import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const PatientDetailed = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const genderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <QuestionMarkIcon />;
    }
  };

  if (!patient) {
    return <div>patient not found</div>;
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
      {patient.entries.length > 0 && (
        <>
          <h2>entries</h2>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              {entry.date} {entry.description}
              <ul>
                {entry?.diagnosisCodes?.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PatientDetailed;
