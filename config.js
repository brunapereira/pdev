module.exports = {
  filePath: function() {
    return __dirname + '/pdev.json';
  },

  initStructure: function() { 
    return { activities: [] };
  },

  activityStructure: function() {
    return { message: '',  pillar: '', date: '' };
  }
}
