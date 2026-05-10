import { supabase } from '../config/supabase.js';

export class Personalization {
  // Create or update personalization for a user
  static async upsert(userId, personalizationData) {
    const { data, error } = await supabase
      .from('personalizations')
      .upsert(
        {
          user_id: userId,
          answers: personalizationData.answers,
          generated_roadmap: personalizationData.generatedRoadmap,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'user_id',
          returning: 'representation'
        }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get personalization by user ID
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('personalizations')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return data;
  }

  // Delete personalization
  static async deleteByUserId(userId) {
    const { data, error } = await supabase
      .from('personalizations')
      .delete()
      .eq('user_id', userId)
      .select();

    if (error) throw error;
    return { deletedCount: data.length };
  }
}

export default Personalization;