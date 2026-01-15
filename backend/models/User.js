import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getDB } from '../config/db.js';

export class User {
  static collection() {
    return getDB().collection('users');
  }

  // Create a new user
  static async create(userData) {
    const { username, email, password } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date()
    };
    
    const result = await this.collection().insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  // Find user by email
  static async findByEmail(email) {
    return await this.collection().findOne({ email: email.toLowerCase() });
  }

  // Find user by username
  static async findByUsername(username) {
    return await this.collection().findOne({ username });
  }

  // Find user by ID
  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Update user
  static async updateById(id, updateData) {
    const result = await this.collection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  // Delete user
  static async deleteById(id) {
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }

  // Get user without password
  static sanitizeUser(user) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}