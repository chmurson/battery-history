## Battery history

Tracks Macbook's battery stats throughout time.

After installation, it registers a deamon, that is launched once per day to save current battery stats. The more time passes from the installation there more data will be presented by the tool. 

#### Demo
![Demo Gif](https://chmurson.github.io/battery-history/demo.gif)

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

 `system_profiler` that is shipped with Macos is used to power `batter-history`. Following command is used `system_profiler SPPowerDataType -json`

#### Deamon

Installation process registers a Launchd deamon, and schedules it to run once per day. This and the fact that ligthweight Macos's tool is used as source of data makes impact of the tool on battery unnoticeable.

