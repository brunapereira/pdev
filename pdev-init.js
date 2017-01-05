#!/usr/bin/env node

const fs = require('fs');
const config = require('./config.js');
const threatError = require('./threatError');

const file = config.filePath();

if (fs.existsSync(file)) return threatError();

fs.writeFile(file, JSON.stringify(config.initStructure()))
console.log('File created at: ' + config.filePath())
