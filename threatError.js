const config = require('./config.js')

module.exports = function(error) {
  if (error.code === 'ENOENT')
    console.log('File not found at ' + config.filePath() + '. Try run `pdev init` first.');
  return;
}
