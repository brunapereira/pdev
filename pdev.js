#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('add', 'add activity')
  .command('list', 'list activities')
  .command('init', 'create a pdev file')
  .command('push', 'pushes activities to firebase')
  .parse(process.argv)
