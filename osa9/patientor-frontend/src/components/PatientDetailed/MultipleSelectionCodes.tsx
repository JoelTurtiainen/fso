import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis } from "../../types";

type Props = {
  allDiagnoses: Diagnosis[];
  diagnosisCodes: Array<Diagnosis["code"]>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<Array<Diagnosis["code"]>>>;
};

const MultipleSelectionCodes = ({ allDiagnoses, diagnosisCodes, setDiagnosisCodes }: Props) => {
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Diagnosis Codes:</InputLabel>
        <Select
          value={diagnosisCodes}
          multiple
          onChange={handleChange}
          input={<OutlinedInput label="Codes" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {allDiagnoses
            .sort((a, b) => a.code.localeCompare(b.code))
            .map((d) => (
              <MenuItem key={d.code} value={d.code}>
                <Checkbox checked={diagnosisCodes.includes(d.code)} />
                <ListItemText primary={d.code} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectionCodes;
