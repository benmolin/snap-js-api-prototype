import { MIN_ALLOTMENTS } from '../program_data/min_allotments.js';

export class FetchMinAllotment {
    // Uses a state or territory and a household size to fetch the min allotment,
    // returning false if the household is not eligible for a minimum allotment.

    // In 2020, only one- and two- person households are eligible for a minimum
    // allotment amount.
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.target_year = inputs.target_year;
    }

    state_lookup_key() {
        const NON_DEFAULT_STATES_TERRITORIES = [
            'AK__U',
            'AK_R1',
            'AK_R2',
            'HI',
            'GU',
            'VI',
        ];

        // If AK, add the region
        if (this.state_or_territory.substring(0, 2) == 'AK') {
            this.state_or_territory = this.state_or_territory.substring(0, 2) + '_' + this.state_or_territory.substring(this.state_or_territory.length - 2, this.state_or_territory.length);
        } else {
            this.state_or_territory = this.state_or_territory.substring(0, 2);
        };

        return (NON_DEFAULT_STATES_TERRITORIES.indexOf(this.state_or_territory) > -1)
            ? this.state_or_territory
            : 'DEFAULT';
    }

    calculate() {
        const state_lookup_key = this.state_lookup_key();
        const scale = MIN_ALLOTMENTS[state_lookup_key][this.target_year];

        // Minimum SNAP allotments are only defined for one- or two- person
        // households. A return value of None means no minimum, so the household
        // might receive zero SNAP benefit despite being eligible.
        if (0 < this.household_size < 3) return scale[this.household_size];

        return false;
    }
}