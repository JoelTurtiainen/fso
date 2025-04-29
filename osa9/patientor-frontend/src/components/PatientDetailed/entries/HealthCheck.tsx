import { Diagnosis, HealthCheckEntry } from "../../../types";
import { Medication as Icon, Favorite } from "@mui/icons-material";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
  style: React.CSSProperties;
}

const HealthRating = ({ rating }: { rating: number }) => {
  switch (rating) {
    case 0:
      return <Favorite style={{ color: "green" }} />;
    case 1:
      return <Favorite style={{ color: "yellow" }} />;
    case 2:
      return <Favorite style={{ color: "orange" }} />;
    case 3:
      return <Favorite style={{ color: "red" }} />;
    default:
      return <></>;
  }
};

const HealthCheck = ({ style, entry, diagnoses }: Props) => {
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
      <HealthRating rating={entry.healthCheckRating} /> <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheck;
