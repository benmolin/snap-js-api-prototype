# Changelog
History of changes to this repo since forked from [snap-js-api-prototype](https://github.com/18F/snap-js-api-prototype) and [snap-js-prescreener-prototypes](https://github.com/18F/snap-js-prescreener-prototypes) on 2020-08-20.

### TODO
- Figure out whether BBCE states have different asset tests for HHEOD and not. If no, merge state options asset test variables.

## 2020-09-01
### Removed
- Reverted a change in snap_estimate.js that created a new gross income house for HHEOD
- Removed ``gross_income_limit_factor_elderly_or_disabled``

### Changed
- Renamed ``resource_limit_elderly_or_disabled_income_twice_fpl`` to ``has_resource_limit_elderly_or_disabled_income_twice_fpl``
- Improved dev tools gross income limits table

### Added
- Created Changelog
- Created new rules in gross_income_test.js to account for 200% FPL asset test for HHEOD
- Pass ``has_resource_limit_elderly_or_disabled_income_twice_fpl`` into AssetTest in state_options.js
- Pass ``gross_income`` into AssetTest in state_options.js
- Pass ``net_monthly_income_limit`` into AssetTest in state_options.js
- Pass ``uses_bbce`` into AssetTest and GrossIncomeTest in state_options.js
- Created new rules in asset_test.js to account for 200% FPL asset test for HHEOD
- Added Indiana and Maryland without state deductions

### Summary
- Added compatibility for footnote 2 (2FPL, $3500 asset test) from the BBCE PDF
- Added Indiana and Maryland to complete the scenarios under BBCE PDF (blanket asset test, no 2FPL HHEOD asset test, 2FPL HHEOD asset test)
