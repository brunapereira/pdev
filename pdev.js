#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('add [message]', 'add event with a message')
  .parse(process.argv)
