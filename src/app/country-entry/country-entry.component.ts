import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-country-entry',
    templateUrl: './country-entry.component.html',
    styleUrls: ['./country-entry.component.scss']
})
export class CountryEntryComponent {

    @Output() selectCountry = new EventEmitter<string>();

    countries: Country[] = countries;
    searchValue: string;
    selectedCountry: Country;
    dropdownClosed: boolean = false;
    filteredCountries: Country[];

    constructor() { }
    
    get searchValueEmpty() {
        return this.searchValue === undefined || this.searchValue === '' || this.searchValue === ' ';
    }

    onInputClick() {
        if (!this.searchValueEmpty) {
            this.dropdownClosed = false;
        }
        
    }

    onCountrySelected(country: Country) {
        this.searchValue = country.name;
        this.selectedCountry = country;
        this.dropdownClosed = true;
        this.selectCountry.emit(this.selectedCountry.countryCode);
    }

    onFilterChange() {
        this.filteredCountries = this.countries.filter(c => c.name.toLocaleUpperCase().includes(this.searchValue.toLocaleUpperCase()));
    }

}

export class Country{
    countryCode: string;
    name: string;
}

const countries: Country[] = [
    { countryCode: 'PL', name: 'Poland' },
    { countryCode: 'US', name: 'USA' },
    { countryCode: 'UK', name: 'United Kingdom' },
]