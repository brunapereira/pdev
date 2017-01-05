const firebase = require("firebase-admin");
const fs = require('fs');

const firebaseCredentials = require("./firebase-keys.json");
const config = require('./config.js');
const threatError = require('./threatError');

const file = config.filePath();

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: "https://pdev-9f7fc.firebaseio.com/"
});

const database = firebase.database();
const activitiesRef = database.ref("activities");

const recordToDatabase = (activity) => {
  activitiesRef.push().set(activity).then(() => { 
    activities.length === 0
      ? firebase.database().goOffline() 
      : recordToDatabase(data.activities.pop()); 
  }); 
};

const deleteLocalData = () => {
  fs.readFile(file, (error) => {
    if (error) return console.log(error);

    fs.writeFile(file, JSON.stringify({ activities: [] }));
  });
};

fs.readFile(file, (error, actualData) => {
  if (error) return threatError(error)
  const activities = JSON.parse(actualData).activities
  recordToDatabase(activities.pop());

  deleteLocalData();
});
