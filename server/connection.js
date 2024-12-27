const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI || 'mongodb://localhost:27017'; 

const dbName = 'docker'; 
const collectionName = 'sample-docker';

let db;
let collection;

const connectToDatabase = async () => {
  if (db && collection) {
    return { db, collection };
  }

  try {
    const client = new MongoClient(uri); 
    await client.connect();
    console.log('Connected to MongoDB successfully');

    db = client.db(dbName);
    collection = db.collection(collectionName);
    return { db, collection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;