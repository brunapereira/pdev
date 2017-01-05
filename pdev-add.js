#!/usr/bin/env node

const program = require('commander')
const moment = require('moment')
const fs = require('fs')
const config = require('./config.js')
const threatError = require('./threatError')
const file = config.filePath();

const formatDate = ({date, args}) => {
  const unformattedDate = (date) ? date : args[0]

  if (!unformattedDate || unformattedDate === '.') return moment().format('DD/MM/YYYY')
  if (!isNaN(unformattedDate)) return moment().subtract(parseInt(unformattedDate), 'days').format('DD/MM/YYYY')
  return date
}

const buildActivity = ({message, pillar, date}) => {
  const newActivity = config.activityStructure(); 

  return Object.assign({}, newActivity, {
    message, 
    pillar, 
    date: formatDate(program)
  })
}

program
  .option('-m, --message <message>', 'activity short description')
  .option('-p, --pillar <pillar>', 'activity pillar')
  .option('-d, --date <date>', 'activity date')
  .parse(process.argv)

if (!process.argv.message || !process.argv.pillar)
  program.outputHelp();

fs.readFile(file, (error, pdevContent) => {
  if (error) return threatError(error)
  const actualActivities = JSON.parse(pdevContent).activities

  fs.writeFile(file, JSON.stringify({activities: [...actualActivities, buildActivity(program)]}, null, 2))

  console.log("Activity recorded!")
})
