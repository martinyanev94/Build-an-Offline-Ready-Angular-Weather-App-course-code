import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherResult, WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  city = '';
  loading = false;
  result: WeatherResult | null = null;
  error = '';

  constructor(private readonly weather: WeatherService) {}

  onSearch(): void {
    const city = this.city.trim();
    if (!city) {
      this.error = 'Enter a city first.';
      return;
    }
    this.loading = true;
    this.result = null;
    this.error = '';
    this.weather.searchCity(city).subscribe({
      next: (result) => { this.result = result; this.loading = false; },
      error: (err: Error) => { this.error = err.message; this.loading = false; }
    });
  }
}
