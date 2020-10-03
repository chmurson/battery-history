#!/usr/bin/env bash

# if agent is already loaded, unload it before installing new plist file
launchctl list | grep chmurson.battery-history
if [ $? -eq 0 ]
then
   launchctl unload ~/Library/LaunchAgents/chmurson.battery-history.plist
fi

# copy template file into agents folder, and put real values there
sed "s|{PATH_TO_PROJECT}|$(pwd)|g" launch-agents-templates/chmurson.battery-history.plist | sed "s|{PATH_TO_HOME}|$HOME|g" | sed "s|{PATH_TO_NODE}|$(which node)|g" > ~/Library/LaunchAgents/chmurson.battery-history.plist

# once plist file of agent is ready, load it
launchctl load ~/Library/LaunchAgents/chmurson.battery-history.plist

if [ ! -f ~/.battery-history/log.csv ]; then
    if [ ! -d ~/.battery-history ]; then
        mkdir ~/.battery-history
    fi
    ./index.js show --csv --header >> ~/.battery-history/log.csv
fi
