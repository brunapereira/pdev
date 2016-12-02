#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');

program
  .option('-m, --message', 'activity short description')
  .parse(process.argv);

var args = program.args;

if (!args.length) {
  console.error('packages required');
  process.exit(1);
}

if (program.message) {
  var message = '\n' + program.args[0];
  fs.appendFile('pdev.txt', message, function (err) {
    if (err) return console.log(err);
    console.log("Activity recorded!");
  });
}
