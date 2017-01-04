module.exports = {
  filePath: function() {
    return './pdev.json';
  },

  initStructure: function() { 
    return { activities: [] };
  },

  activityStructure: function() {
    return { message: '',  pillar: '', date: '' };
  }
}
