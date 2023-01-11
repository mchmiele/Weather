import { Injectable } from '@angular/core';
import { CurrentCondition } from 'app/shared/models/api/responses/current-condition';
import { WeatherApiService } from './api/weather-api.service';

@Injectable()
export class WeatherService {

    static URL = 'http://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
    private currentConditions: CurrentCondition[] = [];

    constructor(private weatherApiService: WeatherApiService) { }

    addCurrentConditions(zipcode: string): void {
        this.weatherApiService.getCurrentConditions(zipcode)
            .subscribe(data => {
                this.currentConditions.push({
                    zipCode: zipcode,
                    data: data
                });
            });
    }

    removeCurrentConditions(zipcode: string) {
        for (let i in this.currentConditions) {
            if (this.currentConditions[i].zipCode == zipcode)
                this.currentConditions.splice(+i, 1);
        }
    }

    getCurrentConditions(): CurrentCondition[] {
        return this.currentConditions;
    }

    getWeatherIcon(id) {
        if (id >= 200 && id <= 232)
            return WeatherService.ICON_URL + "art_storm.png";
        else if (id >= 501 && id <= 511)
            return WeatherService.ICON_URL + "art_rain.png";
        else if (id === 500 || (id >= 520 && id <= 531))
            return WeatherService.ICON_URL + "art_light_rain.png";
        else if (id >= 600 && id <= 622)
            return WeatherService.ICON_URL + "art_snow.png";
        else if (id >= 801 && id <= 804)
            return WeatherService.ICON_URL + "art_clouds.png";
        else if (id === 741 || id === 761)
            return WeatherService.ICON_URL + "art_fog.png";
        else
            return WeatherService.ICON_URL + "art_clear.png";
    }

}
