import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ButtonStatus } from 'app/shared/enums/button-status.enum';
import { LocationService } from 'app/shared/services/location.service';
import { interval, Subscription, zip } from 'rxjs';

@Component({
    selector: 'app-status-button',
    templateUrl: './status-button.component.html',
    styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent implements OnInit, OnDestroy {

    @Input() zipCode: string;
    @Output() buttonClick = new EventEmitter<ButtonStatus>();

    buttonStatus: ButtonStatus;

    locationProgressSubscription: Subscription = new Subscription();
    intervalSubscription: Subscription = new Subscription();

    resetButtonInterval = 2000; // reset button interval on purpose increased from 500ms (as in the instruction) to present properly all states and behaviours

    constructor(private locationService: LocationService) { }

    ngOnInit(): void {
        this.buttonStatus = ButtonStatus.Default;
    }

    ngOnDestroy(): void {
        this.locationProgressSubscription.unsubscribe();
        this.intervalSubscription.unsubscribe();
    }

    onClick() {
        this.addButtonStatusChangeSubscription();

        this.buttonClick.emit(this.buttonStatus);

        this.addResetButtonInterval();
    }

    addButtonStatusChangeSubscription() {
        this.locationProgressSubscription = this.locationService.locationProcess.subscribe(v => {
            console.log(v);
            this.buttonStatus = v;
        });
    }

    addResetButtonInterval() {
        this.intervalSubscription = interval(this.resetButtonInterval).subscribe(() => {
            this.resetButton();
        });
    }

    resetButton() {
        this.locationProgressSubscription.unsubscribe();
        this.intervalSubscription.unsubscribe();
        this.buttonStatus = ButtonStatus.Default;
    }

    showAddButton(): boolean {
        return this.buttonStatus === ButtonStatus.Default;
    }

    showWorkingButton(): boolean {
        return this.buttonStatus === ButtonStatus.Working;
    }

    showDoneButton(): boolean {
        return this.buttonStatus === ButtonStatus.Done;
    }
}
