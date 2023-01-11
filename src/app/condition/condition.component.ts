import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../shared/services/weather.service";
import { LocationService } from "../shared/services/location.service";
import { Router } from "@angular/router";
import { interval, Subscription } from 'rxjs';
import { WeatherApiService } from 'app/shared/services/api/weather-api.service';
import { Condition } from 'app/shared/models/api/responses/condition';

@Component({
    selector: 'app-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit, OnDestroy {

    @Input() zipCode: string;
    @Input() countryCode: string;
    
    subscription: Subscription = new Subscription();
    currentCondition: Condition;
    refreshTime: number = 30000;

    constructor(
        private weatherService: WeatherService,
        private weatherApiService: WeatherApiService,
        private locationService: LocationService,
        private router: Router) {
    }


    ngOnInit(): void {
        this.getCurrentCondition();

        this.subscription.add(interval(this.refreshTime).subscribe(() => {
            this.getCurrentCondition();
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getCurrentCondition() {
        if (this.zipCode) {
            this.subscription.add(this.weatherApiService.getCurrentConditions(this.zipCode, this.countryCode).subscribe(v => {
                this.currentCondition = v;
            }));
        }
    }

    getWeatherIcon(id: any): string {
        return this.weatherService.getWeatherIcon(id);
    }

    removeLocation(zip: any) {
        this.locationService.removeLocation(zip)
    }
}
