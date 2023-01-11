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

        if (!this.searchValueEmpty) {
            this.filteredCountries.forEach(c => {
                c.displayName = this.boldString(c.name, this.searchValue);
            })
        }
        
    }

    boldString(fullString: string, boldSubstring: string): string {
        var strRegExp = new RegExp(boldSubstring, 'gi');

        let indexOfSubstring = fullString.toLocaleUpperCase().indexOf(boldSubstring.toLocaleUpperCase());
        let substringToBold = fullString.substring(indexOfSubstring, boldSubstring.length);

        var boldedString = fullString.replace(strRegExp, '<b>'+substringToBold+'</b>');
        
        return boldedString;
      }

}

export class Country{
    countryCode: string;
    name: string;
    displayName?: string;
}

export class CountryNamePart {
    isBolted: boolean;
    namePart: string;
}

const countries: Country[] = [
    { countryCode: 'PL', name: 'Poland' },
    { countryCode: 'US', name: 'USA' },
    { countryCode: 'UK', name: 'United Kingdom' },
]