import { fetchWeatherApi } from 'openmeteo';

const params = {
  //"latitude": 60.1695,
  //"longitude": 24.9354,
  "hourly": "temperature_2m",
  "timezone": "auto",
  "forecast_days": 1
};

const url = "https://api.open-meteo.com/v1/forecast";

// Note: The order of weather variables in the URL query and the indices below need to match!
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const weatherNow = async ([latitude, longitude]) => {
  const request = (await fetchWeatherApi(url, { latitude, longitude, ...params })).pop()!;
  const utcOffsetSeconds = request.utcOffsetSeconds();
  const hourly = request.hourly()!;

  const weatherData = {
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },

  };

  const localTime: Date = new Date();

  const index = weatherData.hourly.time.findIndex((value: Date) => value.getHours() == localTime.getHours());

  return weatherData.hourly.temperature2m[index];
}

export default weatherNow
