#!/usr/bin/env node

const program = require('commander')
const moment = require('moment')
const fs = require('fs')

let activity = { message: '',  pillar: '', date: '' }
const file = 'pdev.json'

const addMessage = (message) => { activity.message = message }
const addPillar = (pillar) => { activity.pillar = pillar }

const addDate = (date) => {
  if (date === '.') return activity.date = moment().format('DD/MM/YYYY')
  if (!isNaN(date)) return activity.date = moment().subtract(parseInt(date), 'days').format('DD/MM/YYYY')

  return activity.date = date
}

program
  .option('-m, --message [message]', 'activity short description', addMessage)
  .option('-p, --pillar [pillar]', 'activity pillar', addPillar)
  .option('-d, --date [date]', 'activity date', addDate)
  .parse(process.argv)

fs.readFile(file, (error, actualData) => {
  if (error) return console.log(error)

  const actualDataObject = JSON.parse(actualData)
  actualDataObject.activities.push(activity)

  console.log("Activity recorded!")
  fs.writeFile(file, JSON.stringify(actualDataObject))
})
