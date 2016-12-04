#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const file = 'pdev.json'

const printActivityInformation = (activity) => {
  console.log(`Pillar: ${activity.pillar}`)
  console.log(`Message: ${activity.message}`)
  console.log(`date: ${activity.date}`)
  console.log("")
}

program
  .parse(process.argv)

fs.readFile(file, (error, actualData) => {
  if (error) return console.log(error)

  const actualDataObject = JSON.parse(actualData)
  actualDataObject.activities.forEach(printActivityInformation)
})
