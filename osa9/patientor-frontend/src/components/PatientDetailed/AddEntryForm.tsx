import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, SelectChangeEvent, Select, MenuItem, InputLabel } from "@mui/material";

import { Diagnosis, EntryType, NewEntry } from "../../types";
import { isNotNumber } from "../../utils";

interface Props {
  onSubmit: (values: NewEntry) => void;
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const EntryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [description, setDescription] = useState("");
  const [extraOptions, setExtraOptions] = useState({ opt1: "", opt2: "", opt3: "" }); // <--- beautiful

  const onEntryChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
        setExtraOptions({ opt1: "", opt2: "", opt3: "" });
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case EntryType.Hospital: {
        const { opt1: dischargeDate, opt2: dischargeCriteria } = extraOptions;
        const entry = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        onSubmit(entry);
        break;
      }

      case EntryType.OccupationalHealthcare: {
        const { opt1: employerName, opt2: sickLeaveStart, opt3: sickLeaveEnd } = extraOptions;
        const entry = {
          ...baseEntry,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
        };
        onSubmit(entry);
        break;
      }

      case EntryType.HealthCheck: {
        const { opt1: healthCheckRating } = extraOptions;
        const entry = {
          ...baseEntry,
          healthCheckRating:
            !isNotNumber(healthCheckRating) && healthCheckRating != "" ? Number(healthCheckRating) : NaN,
        };
        onSubmit(entry);
        break;
      }

      default:
        console.warn("Unknown entry type", type);
        return;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Select label="Entry" fullWidth value={type} onChange={onEntryChange}>
          {EntryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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
        {type === EntryType.Hospital ? (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge:</InputLabel>
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={extraOptions.opt1}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt1: target.value })}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={extraOptions.opt2}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt2: target.value })}
            />
          </>
        ) : type === EntryType.OccupationalHealthcare ? (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={extraOptions.opt1}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt1: target.value })}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave:</InputLabel>
            <TextField
              label="Start date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={extraOptions.opt2}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt2: target.value })}
            />
            <TextField
              label="End date"
              fullWidth
              value={extraOptions.opt3}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt3: target.value })}
            />
          </>
        ) : type === EntryType.HealthCheck ? (
          <>
            <TextField
              label="Health check rating"
              fullWidth
              value={extraOptions.opt1}
              onChange={({ target }) => setExtraOptions({ ...extraOptions, opt1: target.value })}
            />
          </>
        ) : (
          <></>
        )}

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
