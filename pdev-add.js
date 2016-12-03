#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');

program
  .option('-m, --message', 'activity short description')
  .parse(process.argv);

var args = program.args;

if (!args.length) {
  console.error('Hm... You didn\'t specify the activity. :(');
  process.exit(1);
};

if (program.message) {
  fs.readFile('pdev.json', function (error, data) {
    if (error) return console.log(error);

    var obj = JSON.parse(data);
    obj.activities.concat({description: program.args[0]});

    console.log("Activity recorded!")
    var json = JSON.stringify(obj);
    fs.writeFile('pdev.json', json)
  });
};
