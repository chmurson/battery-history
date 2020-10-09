## Battery History

Tracks Macbook's battery stats throughout time.

After installation, it registers a Launchd agent, that runs once per day to save current battery stats. The more time passes from the tool installation the more data will be available to you to see.

### Why?

Batteries have a limited amount of charge cycles before their performance is expected to diminish. It is recommended to replace it at some point, when it gets close to max number of cycles. 

Macbooks provide measurement of current cycles. `battery-history` takes that information and shows how it changes overt time. This provides more control over the Macbook, and possibly leads into extending life of the battery.  

[More info at Apple Support](https://support.apple.com/en-us/HT201585)  

#### Demo
![Demo Gif](https://chmurson.github.io/battery-history/demo.gif)

#### Changelog

[It's here](CHANGELOG.md)

#### How to install

```bash
npm install -g battery-history
```

#### How to use

```
❯ bh

Battery stats:
==============
Cycle count
  current: 57
  last 7 days: +2
  last 30 days: +10
Max capacity:
  current: 8032
  last 7 days: +11
  last 30 days: -319
Battery health: Good

Last day of measurment: 2020-09-13
Days since first measurement: 59

```

#### Source of data

`system_profiler` that is shipped with Macos is used to power `batter-history`. To be specific, it runs the following command: `system_profiler SPPowerDataType -json`

#### Launchd agent

Installation process registers a Launchd agent, and schedules it to run `battery-history` once per day to record current battery status.

The agent should execute `battery-history` once per day. If macbook is turned off, and the day passes, then Launchd triggers agent upon next OS launch. 

> Launchd is equivalent of crontab for MacOS. 

Agent can be controlled via `bh agent {load|unload}` commands. It is turned on by default, but can be turned off and back on. Turned off agent stops data from being collected, unless `battery-history` is executed manually.     

#### Battery impact

Agent executes `battery-history` at maximum once per day, the tool uses builtin CLI MacOS command that is very lightweight. All this makes impacts on battery usage unnoticeable.
