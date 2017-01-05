const config = require('./config.js')

module.exports = function(error) {
  if (error && error.code === 'ENOENT')
    console.log('File not found at ' + config.filePath() + '. Try run `pdev init` first.');
  else
    console.log('File already exists!')
  return;
}
