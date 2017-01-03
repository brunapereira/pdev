#!/usr/bin/env node

const fs = require('fs')
const config = require('./config.js')

fs.writeFile(config.filePath(), JSON.stringify(config.initStructure()))
console.log('File created at: ' + config.filePath())
