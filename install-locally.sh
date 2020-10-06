#!/usr/bin/env bash
npm pack
npm install -g battery-history-$(cat package.json | ./node_modules/.bin/fx ."version").tgz
