import { Component } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {LocationService} from "../services/location.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent {

  constructor(private weatherService : WeatherService, private locationService : LocationService, private router : Router) {
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
