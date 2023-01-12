import { Component, EventEmitter, Output } from '@angular/core';
import { Country } from 'app/shared/models/country';
import { COUNTRIES } from 'app/shared/const/countries'

@Component({
    selector: 'app-country-entry',
    templateUrl: './country-entry.component.html',
    styleUrls: ['./country-entry.component.scss']
})
export class CountryEntryComponent {

    @Output() selectCountry = new EventEmitter<string>();

    countries: Country[] = COUNTRIES;
    searchValue: string;
    selectedCountry: Country;
    dropdownClosed: boolean = false;
    filteredCountries: Country[];
    
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
        this.selectCountry.emit(this.selectedCountry.code);
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
        let indexOfSubstring = fullString.toLocaleUpperCase().indexOf(boldSubstring.toLocaleUpperCase());
        let substringToBold = fullString.substring(indexOfSubstring, indexOfSubstring + boldSubstring.length);

        var boldedString = fullString.replace(substringToBold, '<b>'+substringToBold+'</b>');
        
        return boldedString;
      }

}
