import { Diagnosis, HospitalEntry } from "../../../types";
import { Medication as Icon } from "@mui/icons-material";
interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
  style: React.CSSProperties;
}

const Hospital = ({ style, entry, diagnoses }: Props) => {
  return (
    <div style={style}>
      {entry.date} <Icon />
      <br />
      {entry.description}
      <ul>
        {entry?.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
      diagnose by {entry.specialist}
    </div>
  );
};

export default Hospital;
