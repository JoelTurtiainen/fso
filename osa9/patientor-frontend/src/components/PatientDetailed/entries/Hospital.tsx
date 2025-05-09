import { BaseEntryType, Diagnosis, HospitalEntry } from "../../../types";
import { LocalHospital as Icon } from "@mui/icons-material";
interface Props {
  entry: HospitalEntry & BaseEntryType;
  diagnoses: Diagnosis[];
  style: React.CSSProperties;
}

const Hospital = ({ style, entry, diagnoses }: Props) => {
  return (
    <div style={style}>
      <p>
        {entry.date} <Icon />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry?.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default Hospital;
