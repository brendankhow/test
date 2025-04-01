const admin = require('firebase-admin');
const csv = require('csv-parser');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./vabi-befd1-firebase-adminsdk-fbsvc-c50d49d5c4.json'); // Replace with the path to your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Get a Firestore reference

const results = [];

console.log("Starting to read the CSV file...");

fs.createReadStream("./data/Book1.csv") // Replace with your CSV file name
  .pipe(csv())
  .on('data', (data) => {
    console.log("Processing row:", data); // Log each row being processed
    results.push(data);
  })
  .on('end', () => {
    console.log("Finished reading the CSV file. Total rows:", results.length);

    results.forEach((row, index) => {
      console.log(`Uploading row ${index + 1} to Firestore...`);
      db.collection('csv') // Replace with your desired collection name
        .add(row)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    });

    console.log('CSV file successfully processed');
  })
  .on('error', (error) => {
    console.error("Error reading the CSV file:", error);
  });