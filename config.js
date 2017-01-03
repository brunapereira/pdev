module.exports = {
  filePath: function() {
    return process.env.HOME + '/pdev.json';
  },

  initStructure: function() { 
    return { activities: [] };
  },

  activityStructure: function() {
    return { message: '',  pillar: '', date: '' };  
  }
}
