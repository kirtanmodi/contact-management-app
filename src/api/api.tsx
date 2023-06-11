import axios from "axios";

const baseURL = "https://disease.sh/v3/covid-19";

export const fetchGlobalCases = async () => {
  const response = await axios.get(`${baseURL}/all`);
  return response.data;
};

export const fetchCountryCases = async () => {
  const response = await axios.get(`${baseURL}/countries`);
  return response.data;
};

export const fetchHistoricalCases = async () => {
  const response = await axios.get(`${baseURL}/historical/all?lastdays=all`);
  return response.data;
};
