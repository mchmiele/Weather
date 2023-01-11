import { Injectable } from '@angular/core';
import { Location } from '../models/location';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

    locations: Location[] = [];

    constructor() {
        let locString = localStorage.getItem(LOCATIONS);
        if (locString)
            this.locations = JSON.parse(locString);
    }

    getCurrentLocations(): Location[] {
        return this.locations;
    }

    addLocation(location: Location) {
        this.locations.push(location);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    }

    removeLocation(zipCode: string) {
        let index = this.locations.findIndex(location => location.zipCode == zipCode);
        if (index !== -1) {
            this.locations.splice(index, 1);
            localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        }
    }
}
