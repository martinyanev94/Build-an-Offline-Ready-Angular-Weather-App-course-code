import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';

export interface WeatherResult {
  city: string;
  country: string;
  temperatureC: number;
  weatherCode: number;
}

interface GeocodingResponse {
  results?: Array<{ name: string; country: string; latitude: number; longitude: number }>;
}

interface ForecastResponse {
  current: { temperature_2m: number; weather_code: number };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private readonly http: HttpClient) {}

  searchCity(city: string): Observable<WeatherResult> {
    const params = new HttpParams().set('name', city).set('count', 1);
    return this.http.get<GeocodingResponse>(this.geoUrl, { params }).pipe(
      switchMap((geo) => {
        const place = geo.results?.[0];
        if (!place) return throwError(() => new Error('City not found'));
        const weatherParams = new HttpParams()
          .set('latitude', place.latitude)
          .set('longitude', place.longitude)
          .set('current', 'temperature_2m,weather_code');
        return this.http.get<ForecastResponse>(this.weatherUrl, { params: weatherParams }).pipe(
          map((forecast) => ({
            city: place.name,
            country: place.country,
            temperatureC: forecast.current.temperature_2m,
            weatherCode: forecast.current.weather_code
          }))
        );
      })
    );
  }
}
