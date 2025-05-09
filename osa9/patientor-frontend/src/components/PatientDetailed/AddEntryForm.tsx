import { useState, SyntheticEvent, useEffect } from "react";

import { TextField, Grid, Button, SelectChangeEvent, Select, MenuItem, InputLabel, Input } from "@mui/material";

import dayjs from "dayjs";
import { Diagnosis, EntryType, ExtraOptions, NewEntry } from "../../types";
import { isNotNumber } from "../../utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MultipleSelectionCodes from "./MultipleSelectionCodes";

interface Props {
  onSubmit: (values: NewEntry) => void;
  allDiagnoses: Diagnosis[];
}

interface EntryOption {
  value: EntryType;
  label: string;
}

const EntryOptions: EntryOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onSubmit, allDiagnoses }: Props) => {
  const [date, setDate] = useState<string | null>(null);
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [description, setDescription] = useState("");
  const [extraOptions, setExtraOptions] = useState<ExtraOptions | null>(null);

  useEffect(() => {
    switch (type) {
      case EntryType.Hospital:
        setExtraOptions({ type: EntryType.Hospital, discharge: { date: null, criteria: "" } });
        break;
      case EntryType.OccupationalHealthcare:
        setExtraOptions({
          type: EntryType.OccupationalHealthcare,
          employerName: "",
          sickLeave: { startDate: null, endDate: null },
        });
        break;
      case EntryType.HealthCheck:
        setExtraOptions({ type: EntryType.HealthCheck, healthCheckRating: 0 });
        break;
    }
  }, [type]);

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

    const baseEntry = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    if (extraOptions === null) return;
    switch (extraOptions.type) {
      case EntryType.Hospital: {
        const { discharge } = extraOptions;
        const entry = {
          ...baseEntry,
          discharge: {
            ...discharge,
            date: discharge?.date ? discharge.date : null,
          },
        };
        console.log(entry);
        onSubmit(entry);
        break;
      }

      case EntryType.OccupationalHealthcare: {
        const { employerName, sickLeave } = extraOptions;
        const entry = {
          ...baseEntry,
          employerName,
          ...(sickLeave && {
            sickLeave: {
              startDate: sickLeave?.startDate ? sickLeave?.startDate : null,
              endDate: sickLeave?.endDate ? sickLeave?.endDate : null,
            },
          }),
        };
        onSubmit(entry);
        break;
      }

      case EntryType.HealthCheck: {
        const { healthCheckRating } = extraOptions;
        const entry = {
          ...baseEntry,
          healthCheckRating: !isNotNumber(healthCheckRating) ? Number(healthCheckRating) : NaN,
        };
        onSubmit(entry);
        break;
      }

      default:
        console.warn("Unknown entry type", type);
        return;
    }
  };

  const style = { border: "1px solid grey", borderRadius: "10px", padding: "10px", marginTop: "10px" };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={addEntry} style={style}>
        <InputLabel>Entry</InputLabel>
        <Select label="Entry" fullWidth value={type} onChange={onEntryChange}>
          {EntryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <div style={style}>
          <h3>New {type} entry</h3>

          <DatePicker
            label="Date"
            format="YYYY-MM-DD"
            value={typeof date === "string" ? dayjs(date) : null}
            onChange={(newValue) => setDate(newValue ? newValue.format("YYYY-MM-DD") : null)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <MultipleSelectionCodes
            allDiagnoses={allDiagnoses}
            diagnosisCodes={diagnosisCodes}
            setDiagnosisCodes={setDiagnosisCodes}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />

          {extraOptions && extraOptions.type === EntryType.Hospital ? (
            <>
              <InputLabel style={{ marginTop: 20 }}>Discharge:</InputLabel>

              <DatePicker
                label="Date"
                format="YYYY-MM-DD"
                value={extraOptions.discharge?.date ? dayjs(extraOptions.discharge.date) : null}
                onChange={(newValue) =>
                  setExtraOptions({
                    ...extraOptions,
                    discharge: { ...extraOptions.discharge, date: newValue ? newValue.format("YYYY-MM-DD") : null },
                  })
                }
              />

              <TextField
                label="Criteria"
                fullWidth
                value={extraOptions.discharge?.criteria}
                onChange={({ target }) =>
                  setExtraOptions({ ...extraOptions, discharge: { ...extraOptions.discharge, criteria: target.value } })
                }
              />
            </>
          ) : extraOptions && extraOptions?.type === EntryType.OccupationalHealthcare ? (
            <>
              <TextField
                label="Employer Name"
                fullWidth
                value={extraOptions.employerName}
                onChange={({ target }) => setExtraOptions({ ...extraOptions, employerName: target.value })}
              />

              <InputLabel style={{ marginTop: 20 }}>Sick Leave:</InputLabel>
              <DatePicker
                label="Start date"
                format="YYYY-MM-DD"
                value={extraOptions.sickLeave?.startDate ? dayjs(extraOptions.sickLeave.startDate) : null}
                onChange={(newValue) =>
                  setExtraOptions({
                    ...extraOptions,
                    sickLeave: extraOptions.sickLeave
                      ? { ...extraOptions.sickLeave, startDate: newValue ? newValue.format("YYYY-MM-DD") : null }
                      : undefined,
                  })
                }
              />
              <DatePicker
                label="End date"
                format="YYYY-MM-DD"
                value={extraOptions.sickLeave?.endDate ? dayjs(extraOptions.sickLeave.endDate) : null}
                onChange={(newValue) =>
                  setExtraOptions({
                    ...extraOptions,
                    sickLeave: extraOptions.sickLeave
                      ? { ...extraOptions.sickLeave, endDate: newValue ? newValue.format("YYYY-MM-DD") : null }
                      : undefined,
                  })
                }
              />
            </>
          ) : extraOptions && extraOptions?.type === EntryType.HealthCheck ? (
            <>
              <InputLabel>Health Check Rating:</InputLabel>
              <Input
                type="number"
                fullWidth
                value={extraOptions.healthCheckRating}
                onChange={({ target }) => setExtraOptions({ ...extraOptions, healthCheckRating: Number(target.value) })}
              />
            </>
          ) : (
            <></>
          )}
        </div>

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
    </LocalizationProvider>
  );
};

export default AddEntryForm;
