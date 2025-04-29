import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${id}`);

  return data;
};

export default {
  getAll,
  getOne,
};
