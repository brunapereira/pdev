#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const moment = require('moment')
const config = require('./config.js')
const threatError = require('./threatError')

const read = (file) =>
  (orderer) => {
    fs.readFile(file, (error, actualData) => {
      if (error) return threatError(error) 
      orderer(JSON.parse(actualData).activities)
    })
  }

const printer = (activities) =>
  activities.forEach((activity) => {
    console.log(`Pillar: ${activity.pillar}`)
    console.log(`Message: ${activity.message}`)
    console.log(`date: ${activity.date}`)
    console.log("")
  })

const createDateOrderer = (activities) => {
  printer(activities)
}

const pillarOrderer = (activities) => {
  const activitiesSortedByPillar = activities.sort((a, b) => {
    if (a.pillar > b.pillar) { return 1; }
    if (a.pillar < b.pillar) { return -1; }
    return 0;
  })

  printer(activities)
}

const dateOrderer = (activities) => {
  const activitiesSortedByDate = activities.sort((a, b) => {
    aDate = moment(a.date, 'DD/MM/YYYY')
    bDate = moment(b.date, 'DD/MM/YYYY')

    return aDate.diff(bDate, 'days')
  })

  printer(activities)
}

const orderByPillar = () => read(config.filePath())(pillarOrderer)
const orderByCreateDate = () => read(config.filePath())(createDateOrderer)
const orderByDate = () => read(config.filePath())(dateOrderer)

program
  .option('-p, --pillar', 'print information sorted by pillar', orderByPillar)
  .option('-d, --date', 'print information sorted by date', orderByDate)
  .option('-a, --all', 'print all information', orderByCreateDate)
  .parse(process.argv)

if (!process.argv[2]) orderByCreateDate()
