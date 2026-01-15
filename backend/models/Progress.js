import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export class Progress {
  static collection() {
    return getDB().collection('progress');
  }

  // Create or update progress
  static async upsert(userId, skillId, progressData) {
    const result = await this.collection().findOneAndUpdate(
      { userId: new ObjectId(userId), skillId },
      { 
        $set: {
          ...progressData,
          updatedAt: new Date()
        },
        $setOnInsert: {
          userId: new ObjectId(userId),
          skillId,
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

  // Get all progress for a user
  static async findByUserId(userId) {
    return await this.collection()
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }

  // Get progress for a specific skill
  static async findByUserAndSkill(userId, skillId) {
    return await this.collection().findOne({
      userId: new ObjectId(userId),
      skillId
    });
  }

  // Mark skill as complete
  static async markComplete(userId, skillId, notes = '') {
    return await this.upsert(userId, skillId, {
      completed: true,
      completedAt: new Date(),
      notes
    });
  }

  // Mark skill as incomplete
  static async markIncomplete(userId, skillId) {
    return await this.upsert(userId, skillId, {
      completed: false,
      completedAt: null
    });
  }

  // Delete progress
  static async deleteByUserAndSkill(userId, skillId) {
    return await this.collection().deleteOne({
      userId: new ObjectId(userId),
      skillId
    });
  }

  // Get progress statistics
  static async getStats(userId) {
    const allProgress = await this.findByUserId(userId);
    const completed = allProgress.filter(p => p.completed).length;
    const total = allProgress.length;
    
    return {
      total,
      completed,
      remaining: total - completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
}

export default Progress;