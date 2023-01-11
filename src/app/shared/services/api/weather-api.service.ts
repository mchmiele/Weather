import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Condition } from 'app/shared/models/api/responses/condition';
import { Forecast } from 'app/shared/models/api/responses/forecast';

@Injectable()
export class WeatherApiService {

    static URL = 'http://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

    constructor(private http: HttpClient) { }

    getCurrentConditions(zipcode: string): Observable<Condition> {
        return this.http.get<Condition>(`${WeatherApiService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherApiService.APPID}`);
    }

    getForecast(zipcode: string): Observable<Forecast> {
        return this.http.get<Forecast>(`${WeatherApiService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherApiService.APPID}`);
    }

}
