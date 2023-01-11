import { Component } from '@angular/core';
import { ButtonStatus } from 'app/shared/enums/button-status.enum';
import { LocationService } from 'app/shared/services/location.service';

@Component({
    selector: 'app-location-entry',
    templateUrl: './location-entry.component.html',
    styleUrls: ['./location-entry.component.scss']
})
export class LocationEntryComponent {
    zipCode: string;

    constructor(private locationService: LocationService) { }

    onClick(buttonStatus: ButtonStatus) {
        if (buttonStatus !== ButtonStatus.Default) {
            window.alert('Operation not allowed');
        }
        
        if (!this.zipCode) {
            window.alert('ZipCode cannot be empty');
            return;
        }

        this.locationService.locationProcess.next(ButtonStatus.Working);
        this.locationService.addLocation({ zipCode: this.zipCode });
        this.zipCode = '';
    }
}
