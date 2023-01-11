import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  zipCodes : string[] = [];

  constructor(private weatherService : WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.zipCodes = JSON.parse(locString);
    for (let loc of this.zipCodes)
      this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode : string){
    this.zipCodes.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.zipCodes));
    this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.zipCodes.indexOf(zipcode);
    if (index !== -1){
      this.zipCodes.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.zipCodes));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
