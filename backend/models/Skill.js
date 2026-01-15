import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export class Skill {
  static collection() {
    return getDB().collection('skills');
  }

  // Create a new skill
  static async create(skillData) {
    const skill = {
      ...skillData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await this.collection().insertOne(skill);
    return { ...skill, _id: result.insertedId };
  }

  // Find all skills
  static async findAll() {
    return await this.collection().find({}).toArray();
  }

  // Find skill by skillId
  static async findBySkillId(skillId) {
    return await this.collection().findOne({ skillId });
  }

  // Find skill by MongoDB _id
  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  // Find skills by category
  static async findByCategory(categoryId) {
    return await this.collection()
      .find({ categoryId })
      .toArray();
  }

  // Update skill
  static async updateBySkillId(skillId, updateData) {
    const result = await this.collection().findOneAndUpdate(
      { skillId },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );
    return result;
  }

  // Delete skill
  static async deleteBySkillId(skillId) {
    return await this.collection().deleteOne({ skillId });
  }

  // Get all unique categories
  static async getCategories() {
    return await this.collection()
      .aggregate([
        {
          $group: {
            _id: '$categoryId',
            title: { $first: '$categoryTitle' },
            description: { $first: '$categoryDescription' },
            difficulty: { $first: '$categoryDifficulty' },
            color: { $first: '$categoryColor' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
      .toArray();
  }
}