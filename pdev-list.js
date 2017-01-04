#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
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

const orderByPillar = () => read(config.filePath())(pillarOrderer)
const orderByCreateDate = () => read(config.filePath())(createDateOrderer)

program
  .option('-p, --pillar', 'print information sorted by pillar', orderByPillar)
  .option('-a, --all', 'print all information', orderByCreateDate)
  .parse(process.argv)
