#!/usr/bin/env node

const program = require('commander')
const moment = require('moment')
const fs = require('fs')

let newActivity = { id: '',  message: '',  pillar: '', date: '' }
const file = 'pdev.json'

const addMessage = (message) => newActivity.message = message
const addPillar = (pillar) => newActivity.pillar = pillar
const addId = (lastActivity) => lastActivity.id ? newActivity.id = lastActivity.id + 1 : newActivity.id = 0

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

  addId(actualActivities.slice(-1).pop())

  fs.writeFile(file, JSON.stringify({activities: [...actualActivities, newActivity]}, null, 2))

  console.log("Activity recorded!")
})
