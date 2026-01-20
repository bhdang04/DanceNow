import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'hiphop-roadmap';

let db = null;
let client = null;

export const connectDB = async () => {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`MongoDB Connected: ${dbName}`);
    
    // Create indexes
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Create necessary indexes
const createIndexes = async () => {
  try {
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    
    // Progress collection indexes
    await db.collection('progress').createIndex(
      { userId: 1, skillId: 1 }, 
      { unique: true }
    );
    
    // Skills collection indexes
    await db.collection('skills').createIndex({ skillId: 1 }, { unique: true });
    await db.collection('skills').createIndex({ categoryId: 1 });

    // Personalizations collection indexes
    await db.collection('personalizations').createIndex({ userId: 1 }, { unique: true });
    
    console.log('Database indexes created');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

// Get database instance
export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

// Close database connection
export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

export default connectDB;
