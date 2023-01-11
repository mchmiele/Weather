import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '../models/location';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

    locationProcess: Subject<string> = new Subject();
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
        setTimeout(()=>{ this.locationProcess.next('done'); }, 500) // timeout on purpose to demonstrate the middle-state: working
        
    }

    removeLocation(zipCode: string) {
        let index = this.locations.findIndex(location => location.zipCode == zipCode);
        if (index !== -1) {
            this.locations.splice(index, 1);
            localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        }
    }
}
