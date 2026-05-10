import { supabase } from '../config/supabase.js';

export class Skill {
  // Create a new skill
  static async create(skillData) {
    const { data, error } = await supabase
      .from('skills')
      .insert({
        skill_id: skillData.skillId,
        title: skillData.title,
        description: skillData.description,
        difficulty: skillData.difficulty,
        duration: skillData.duration,
        video_url: skillData.videoUrl,
        category_id: skillData.categoryId,
        category_title: skillData.categoryTitle,
        category_description: skillData.categoryDescription,
        category_difficulty: skillData.categoryDifficulty,
        category_color: skillData.categoryColor,
        key_points: skillData.keyPoints,
        common_mistakes: skillData.commonMistakes,
        practice_drills: skillData.practiceDrills,
        prerequisites: skillData.prerequisites
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Find all skills
  static async findAll() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category_id', { ascending: true });

    if (error) throw error;
    
    // Convert snake_case to camelCase for compatibility
    return data.map(skill => ({
      id: skill.id,
      skillId: skill.skill_id,
      title: skill.title,
      description: skill.description,
      difficulty: skill.difficulty,
      duration: skill.duration,
      videoUrl: skill.video_url,
      categoryId: skill.category_id,
      categoryTitle: skill.category_title,
      categoryDescription: skill.category_description,
      categoryDifficulty: skill.category_difficulty,
      categoryColor: skill.category_color,
      keyPoints: skill.key_points,
      commonMistakes: skill.common_mistakes,
      practiceDrills: skill.practice_drills,
      prerequisites: skill.prerequisites,
      createdAt: skill.created_at
    }));
  }

  // Find skill by skillId
  static async findBySkillId(skillId) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('skill_id', skillId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return this.transformSkill(data);
  }

  // Find skill by UUID
  static async findById(id) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return this.transformSkill(data);
  }

  // Find skills by category
  static async findByCategory(categoryId) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category_id', categoryId);

    if (error) throw error;
    return data.map(skill => this.transformSkill(skill));
  }

  // Update skill
  static async updateBySkillId(skillId, updateData) {
    const { data, error } = await supabase
      .from('skills')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('skill_id', skillId)
      .select()
      .single();

    if (error) throw error;
    return this.transformSkill(data);
  }

  // Delete skill
  static async deleteBySkillId(skillId) {
    const { data, error } = await supabase
      .from('skills')
      .delete()
      .eq('skill_id', skillId)
      .select();

    if (error) throw error;
    return { deletedCount: data.length };
  }

  // Get all unique categories
  static async getCategories() {
    const { data, error } = await supabase
      .from('skills')
      .select('category_id, category_title, category_description, category_difficulty, category_color')
      .order('category_id', { ascending: true });

    if (error) throw error;

    // Group by category_id
    const categoriesMap = {};
    data.forEach(skill => {
      if (!categoriesMap[skill.category_id]) {
        categoriesMap[skill.category_id] = {
          _id: skill.category_id,
          title: skill.category_title,
          description: skill.category_description,
          difficulty: skill.category_difficulty,
          color: skill.category_color,
          count: 0
        };
      }
      categoriesMap[skill.category_id].count++;
    });

    return Object.values(categoriesMap);
  }

  // Helper: Transform snake_case to camelCase
  static transformSkill(skill) {
    if (!skill) return null;
    
    return {
      id: skill.id,
      skillId: skill.skill_id,
      title: skill.title,
      description: skill.description,
      difficulty: skill.difficulty,
      duration: skill.duration,
      videoUrl: skill.video_url,
      categoryId: skill.category_id,
      categoryTitle: skill.category_title,
      categoryDescription: skill.category_description,
      categoryDifficulty: skill.category_difficulty,
      categoryColor: skill.category_color,
      keyPoints: skill.key_points,
      commonMistakes: skill.common_mistakes,
      practiceDrills: skill.practice_drills,
      prerequisites: skill.prerequisites,
      createdAt: skill.created_at
    };
  }
}

export default Skill;