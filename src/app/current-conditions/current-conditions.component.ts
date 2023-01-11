import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../shared/services/weather.service";
import { LocationService } from "../shared/services/location.service";
import { Router } from "@angular/router";
import { interval, Subscription } from 'rxjs';
import { CurrentCondition } from 'app/shared/models/api/responses/current-condition';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

    getCurrentConditionSubscription: Subscription;
    currentConditions: CurrentCondition[] = [];
    refreshTime: number = 30000;

    constructor(private weatherService: WeatherService, private locationService: LocationService, private router: Router) {
    }


    ngOnInit(): void {
        this.getCurrentConditions();

        this.getCurrentConditionSubscription = interval(this.refreshTime).subscribe(() => {
            this.getCurrentConditions();
        });
    }

    ngOnDestroy(): void {
        this.getCurrentConditionSubscription.unsubscribe();
    }

    getCurrentConditions() {
        console.log('getCurrentConditions');
        this.currentConditions = this.weatherService.getCurrentConditions();
    }

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode])
    }

    getWeatherIcon(id: any): string {
        return this.weatherService.getWeatherIcon(id);
    }

    removeLocation(zip: any) {
        this.locationService.removeLocation(zip)
    }
}
