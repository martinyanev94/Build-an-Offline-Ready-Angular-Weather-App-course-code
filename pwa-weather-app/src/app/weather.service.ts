import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { OpenWeatherResponse, Weather } from './weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = 'YOUR_OPENWEATHER_API_KEY';

  getWeather(city: string): Observable<Weather> {
    const params = new HttpParams().set('q', city).set('appid', this.apiKey).set('units', 'metric');
    return this.http.get<OpenWeatherResponse>(this.apiUrl, { params }).pipe(
      map(response => ({
        city: response.name,
        temperature: response.main.temp,
        description: response.weather[0]?.description ?? 'Unknown conditions'
      }))
    );
  }
}
