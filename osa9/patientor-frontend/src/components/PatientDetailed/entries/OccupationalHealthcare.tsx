import { BaseEntryType, Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import { Work as Icon } from "@mui/icons-material";

interface Props {
  entry: OccupationalHealthcareEntry & BaseEntryType;
  diagnoses: Diagnosis[];
  style: React.CSSProperties;
}

const HealthCheck = ({ style, entry, diagnoses }: Props) => {
  console.log(entry);
  return (
    <div style={style}>
      <p>
        {entry.date}
        <Icon />
      </p>
      {entry.description}
      <ul>
        {entry?.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
      {entry.sickLeave?.startDate && (
        <p>
          Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      )}
      <p>Employer: {entry.employerName}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheck;
