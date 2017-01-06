#!/usr/bin/env node

const program = require('commander')

program
  .version('1.0.2')
  .command('add', 'add activity')
  .command('list', 'list activities')
  .command('init', 'create a pdev file')
  .command('push', 'pushes activities to firebase')
  .parse(process.argv)
