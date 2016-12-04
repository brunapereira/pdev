#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const file = 'pdev.json'

const read = (file) =>
  (orderer) =>
    fs.readFile(file, (error, actualData) => {
      if (error) return console.log(error)
      orderer(JSON.parse(actualData).activities)
    })

const printer = (activities) =>
  activities.forEach((activity) => {
    console.log(`Pillar: ${activity.pillar}`)
    console.log(`Message: ${activity.message}`)
    console.log(`date: ${activity.date}`)
    console.log("")
  })

const orderByCreateDate = (activities) => {
  printer(activities)
}

const orderByPillar = (activities) => {
  const activitiesSortedByPillar = activities.sort((a, b) => {
    if (a.pillar > b.pillar) { return 1; }
    if (a.pillar < b.pillar) { return -1; }
    return 0;
  })

  printer(activities)
}

program
  .option('-p, --pillar', 'print information sorted by pillar', read(file)(orderByPillar))
  .option('-a, --all', 'print all information', read(file)(orderByCreateDate))
  .parse(process.argv)
