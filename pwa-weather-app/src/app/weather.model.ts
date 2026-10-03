export interface Weather {
  city: string;
  temperature: number;
  description: string;
}

export interface OpenWeatherResponse {
  name: string;
  main: { temp: number };
  weather: Array<{ description: string }>;
}
