#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const file = 'pdev.json'

program
  .parse(process.argv)

fs.readFile(file, (error, actualData) => {
  if (error) return console.log(error)

  const actualDataObject = JSON.parse(actualData)
  console.log(actualDataObject)
})
