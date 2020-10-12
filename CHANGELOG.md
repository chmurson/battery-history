# Changelog

## [0.3.0]

### Added
- Shows stats of more time ranges:
  - Previously it displayed stats from last 7 and 30 days
  - Now it shows also (if data available) from last: 60, 90, 180 days and last year, 2 years... up to 7.  

## [0.2.2]

### Added
- Information about motivations to create `battery-history` to `README.md` + link to Apple Support article explaining role of cycles counts of the battery in measurement of battery life. 

## [0.2.1]

### Added
- Changelog added.
### Fixed
- Agent triggers battery-history correctly once per day
  - launchd `StartCalendarInverval` is used instead `StartInverval` which guarantees that scheduled task is triggered while computer is asleep, after it woken up
- `install-locally.sh` gets now version from package.json, so it does not need to need to be updated once  
