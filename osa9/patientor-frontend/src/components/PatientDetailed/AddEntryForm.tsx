import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, Grid, Button, SelectChangeEvent, Select, MenuItem } from "@mui/material";

import { Diagnosis, EntryType, newEntry } from "../../types";

interface Props {
  onSubmit: (values: newEntry) => void;
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const EntryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

// const EntryTypeOptions: EntryType[] = Object.values(EntryType).map((v) => ({
//   value: v,
//   label: v.toString(),
// }));

const AddEntryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [description, setDescription] = useState("");
  const [dischargeDate, setDischargeDate] = useState("2025-05-02");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onEntryChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (type == EntryType.Hospital) {
      onSubmit({
        date,
        type,
        specialist,
        diagnosisCodes,
        description,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      });
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="DiagnosisCodes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Select label="Entry" fullWidth value={type} onChange={onEntryChange}>
          {EntryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Discharge:</InputLabel>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

        <Grid>
          <Grid item></Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
