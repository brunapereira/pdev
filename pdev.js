#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('add', 'add activity').alias('a')
  .parse(process.argv)
