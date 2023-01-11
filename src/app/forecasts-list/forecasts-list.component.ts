import { Component } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'app/shared/models/api/responses/forecast';
import { WeatherApiService } from 'app/shared/services/api/weather-api.service';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.scss']
})
export class ForecastsListComponent {

    zipcode: string;
    forecast: Forecast;

    constructor(
        private weatherService: WeatherService, 
        weatherApiService: WeatherApiService,
        route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            weatherApiService.getForecast(this.zipcode)
                .subscribe(data => {
                    this.forecast = data;
                });
        });
    }

    getWeatherIcon(id: any): string {
        return this.weatherService.getWeatherIcon(id);
    }
}
