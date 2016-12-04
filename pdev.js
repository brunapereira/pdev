#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('add', 'add activity').alias('a')
  .command('list', 'list activities').alias('l')
  .parse(process.argv)
