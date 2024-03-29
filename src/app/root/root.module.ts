import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RootComponent } from './root.component';
import { LocationEntryComponent } from '../location-entry/location-entry.component';
import { LocationService } from "../shared/services/location.service";
import { ForecastsListComponent } from './../forecasts-list/forecasts-list.component';
import { WeatherService } from "../shared/services/weather.service";
import { CurrentConditionsComponent } from './../current-conditions/current-conditions.component';
import { MainPageComponent } from './../main-page/main-page.component';
import { RouterModule } from "@angular/router";
import { routing } from "./root.routing";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { WeatherApiService } from 'app/shared/services/api/weather-api.service';
import { ConditionComponent } from 'app/condition/condition.component';
import { StatusButtonComponent } from 'app/status-button/status-button.component';
import { CountryEntryComponent } from 'app/country-entry/country-entry.component';

@NgModule({
    declarations: [
        RootComponent,
        LocationEntryComponent,
        CountryEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        ConditionComponent,
        MainPageComponent,
        StatusButtonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        LocationService,
        WeatherService,
        WeatherApiService
    ],
    bootstrap: [RootComponent]
})
export class RootModule { }
