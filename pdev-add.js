#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')

program
  .option('-m, --message', 'activity short description')
  .parse(process.argv)

const file = 'pdev.json'
const args = program.args

if (!args.length) {
  console.error('Hm... You didn\'t specify the activity. :(')
  process.exit(1)
}

if (program.message) {
  fs.readFile(file, (error, actualData) => {
    if (error) return console.log(error)

    const actualDataObject = JSON.parse(actualData)
    actualDataObject.activities.push({description: program.args[0]})

    console.log("Activity recorded!")
    fs.writeFile('pdev.json', JSON.stringify(actualDataObject))
  })
}
