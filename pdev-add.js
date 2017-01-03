#!/usr/bin/env node

const config = require('./config.js')
const program = require('commander')
const moment = require('moment')
const fs = require('fs')

let newActivity = config.activityStructure(); 
const file = config.filePath();

const addMessage = (message) => newActivity.message = message
const addPillar = (pillar) => newActivity.pillar = pillar

const addDate = (date) => {
  if (date === '.') return newActivity.date = moment().format('DD/MM/YYYY')
  if (!isNaN(date)) return newActivity.date = moment().subtract(parseInt(date), 'days').format('DD/MM/YYYY')

  return newActivity.date = date
}

program
  .option('-m, --message [message]', 'activity short description', addMessage)
  .option('-p, --pillar [pillar]', 'activity pillar', addPillar)
  .option('-d, --date [date]', 'activity date', addDate)
  .parse(process.argv)

fs.readFile(file, (error, pdevContent) => {
  if (error) return console.log(error)
  const actualActivities = JSON.parse(pdevContent).activities

  fs.writeFile(file, JSON.stringify({activities: [...actualActivities, newActivity]}, null, 2))

  console.log("Activity recorded!")
})
