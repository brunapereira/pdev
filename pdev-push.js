const firebase = require("firebase-admin");

const firebaseCredentials = require("./firebase-keys.json");
const data = require("./pdev.json");

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: "https://pdev-9f7fc.firebaseio.com/"
});

const database = firebase.database();
const activitiesRef = database.ref("activities");

const recordToDatabase = (activity) => {
  activitiesRef.push().set(activity).then(() => { 
    data.activities.length === 0
      ? firebase.database().goOffline() 
      : recordToDatabase(data.activities.pop()); 
  }); 
}

recordToDatabase(data.activities.pop());
