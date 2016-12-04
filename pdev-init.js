#!/usr/bin/env node

//const program = require('commander')
const fs = require('fs')
const defaultPath = process.env.HOME + '/pdev.json'
const initStructure = { activities: [] }

fs.writeFile(defaultPath, JSON.stringify(initStructure))
console.log('File created at: ' + defaultPath)
