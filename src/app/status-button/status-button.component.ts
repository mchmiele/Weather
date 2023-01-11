import { Component, Input, OnInit } from '@angular/core';
import { LocationStatus } from 'app/shared/enums/location-status.enum';
import { LocationService } from 'app/shared/services/location.service';
import { interval, Subscription, zip } from 'rxjs';

@Component({
    selector: 'app-status-button',
    templateUrl: './status-button.component.html',
    styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent implements OnInit {

    @Input() zipCode: string;

    locationStatus: LocationStatus;

    locationProgressSubscription: Subscription;
    intervalSubscription: Subscription = new Subscription();

    resetButtonInterval = 2000; // reset button interval on purpose increased from 500ms (as in the instruction) to present properly all states and behaviours

    constructor(private locationService: LocationService) { }

    ngOnInit(): void {
        this.locationStatus = LocationStatus.Default;
    }

    addLocation() {
        if (!this.zipCode) {
            window.alert('ZipCode cannot be empty');
            return;
        }

        this.addButtonStatusChangeSubscription();
        this.addResetButtonInterval();

        this.locationService.locationProcess.next("working");
        this.locationService.addLocation({ zipCode: this.zipCode });
    }

    addButtonStatusChangeSubscription() {
        this.locationProgressSubscription = this.locationService.locationProcess.subscribe(v => {
            if (v == 'default') {
                this.locationStatus = LocationStatus.Default;
            }

            if (v == 'working') {
                this.locationStatus = LocationStatus.Working;
            }

            if (v == 'done') {
                this.locationStatus = LocationStatus.Done;
            }
        });
    }

    addResetButtonInterval() {
        this.intervalSubscription.add(interval(this.resetButtonInterval).subscribe(() => {
            this.resetButton();
        }));
    }

    resetButton() {
        this.locationProgressSubscription.unsubscribe();
        this.locationStatus = LocationStatus.Default;
    }

    showAddButton(): boolean {
        return this.locationStatus === LocationStatus.Default;
    }

    showWorkingButton(): boolean {
        return this.locationStatus === LocationStatus.Working;
    }

    showDoneButton(): boolean {
        return this.locationStatus === LocationStatus.Done;
    }
}
