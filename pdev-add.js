#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')

let activity = { message: '',  pillar: '', date: '' }

const addMessage = (message) => {
  activity.message = message
}

const addPillar = (pillar) => {
  activity.pillar = pillar
}

const addDate = (date) => {
  activity.date = date
}

program
  .option('-m, --message [message]', 'activity short description', addMessage)
  .option('-p, --pillar [pillar]', 'activity pillar', addPillar)
  .option('-d, --date [date]', 'activity date', addDate)
  .parse(process.argv)

const file = 'pdev.json' 

fs.readFile(file, (error, actualData) => {
  if (error) return console.log(error)

  const actualDataObject = JSON.parse(actualData)
  actualDataObject.activities.push(activity)

  console.log("Activity recorded!")
  fs.writeFile(file, JSON.stringify(actualDataObject))
})
