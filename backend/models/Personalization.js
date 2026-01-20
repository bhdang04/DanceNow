import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export class Personalization {
  static collection() {
    return getDB().collection('personalizations');
  }

  // Create or update personalization for a user
  static async upsert(userId, personalizationData) {
    const result = await this.collection().findOneAndUpdate(
      { userId: new ObjectId(userId) },
      { 
        $set: {
          ...personalizationData,
          updatedAt: new Date()
        },
        $setOnInsert: {
          userId: new ObjectId(userId),
          createdAt: new Date()
        }
      },
      { 
        upsert: true,
        returnDocument: 'after'
      }
    );
    return result;
  }

  // Get personalization by user ID
  static async findByUserId(userId) {
    return await this.collection().findOne({ userId: new ObjectId(userId) });
  }

  // Delete personalization
  static async deleteByUserId(userId) {
    return await this.collection().deleteOne({ userId: new ObjectId(userId) });
  }
}

export default Personalization;