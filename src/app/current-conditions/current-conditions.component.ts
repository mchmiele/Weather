import { Component, OnInit } from '@angular/core';
import { Location } from 'app/shared/models/location';
import { LocationService } from 'app/shared/services/location.service';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

    locations: Location[] = [];

    constructor(private locationService: LocationService) {
    }
    
    ngOnInit(): void {
        this.getCurrentConditions();
    }

    getCurrentConditions() {
        this.locations = this.locationService.getCurrentLocations();
    }
}
