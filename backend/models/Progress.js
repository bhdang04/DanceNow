import { supabase } from '../config/supabase.js';

export class Progress {
  // Create or update progress
  static async upsert(userId, skillId, progressData) {
    const { data, error } = await supabase
      .from('progress')
      .upsert(
        {
          user_id: userId,
          skill_id: skillId,
          completed: progressData.completed || false,
          completed_at: progressData.completedAt || null,
          notes: progressData.notes || '',
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'user_id,skill_id',
          returning: 'representation'
        }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get all progress for a user
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get progress for a specific skill
  static async findByUserAndSkill(userId, skillId) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return data;
  }

  // Mark skill as complete
  static async markComplete(userId, skillId, notes = '') {
    return await this.upsert(userId, skillId, {
      completed: true,
      completedAt: new Date().toISOString(),
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
    const { data, error } = await supabase
      .from('progress')
      .delete()
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .select();

    if (error) throw error;
    return { deletedCount: data.length };
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