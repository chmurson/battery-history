# Changelog

## [Unreleased]

### Added
- Information about motivations to create `battery-history` to `README.md` + link to Apple Support article explaining role of cycles counts of the battery in measurement of battery life. 

## [0.2.1]

### Added
- Changelog added.
### Fixed
- Agent triggers battery-history correctly once per day
  - launchd `StartCalendarInverval` is used instead `StartInverval` which guarantees that scheduled task is triggered while computer is asleep, after it woken up
- `install-locally.sh` gets now version from package.json, so it does not need to need to be updated once  
