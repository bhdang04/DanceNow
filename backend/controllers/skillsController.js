import { Skill } from '../models/Skill.js';

// @desc    Get all skills and categories
// @route   GET /api/skills
// @access  Public
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();

    // Group skills by category
    const categories = skills.reduce((acc, skill) => {
      const categoryId = skill.categoryId;
      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          id: categoryId,
          title: skill.categoryTitle,
          description: skill.categoryDescription,
          difficulty: skill.categoryDifficulty,
          color: skill.categoryColor,
          skills: []
        };
      }
      
      acc[categoryId].skills.push({
        id: skill.skillId,
        title: skill.title,
        difficulty: skill.difficulty,
        duration: skill.duration,
        videoUrl: skill.videoUrl,
        description: skill.description,
        keyPoints: skill.keyPoints,
        commonMistakes: skill.commonMistakes,
        practiceDrills: skill.practiceDrills,
        prerequisites: skill.prerequisites
      });
      
      return acc;
    }, {});

    res.json({
      success: true,
      categories: Object.values(categories)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/skills/categories
// @access  Public
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Skill.getCategories();

    res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get skills by category
// @route   GET /api/skills/category/:categoryId
// @access  Public
export const getSkillsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const skills = await Skill.findByCategory(categoryId);

    res.json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get skill by ID
// @route   GET /api/skills/:skillId
// @access  Public
export const getSkillById = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findBySkillId(skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({
      success: true,
      skill
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = async (req, res) => {
  try {
    const skillData = req.body;

    // Validate required fields
    if (!skillData.skillId || !skillData.title || !skillData.categoryId) {
      return res.status(400).json({ 
        message: 'Please provide skillId, title, and categoryId' 
      });
    }

    // Check if skill already exists
    const existingSkill = await Skill.findBySkillId(skillData.skillId);
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill ID already exists' });
    }

    const skill = await Skill.create(skillData);

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:skillId
// @access  Private
export const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const updateData = req.body;

    const skill = await Skill.updateBySkillId(skillId, updateData);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:skillId
// @access  Private
export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const result = await Skill.deleteBySkillId(skillId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Seed initial skills data
// @route   POST /api/skills/seed
// @access  Public (can protect this in production)
export const seedSkills = async (req, res) => {
  try {
    // Sample seed data based on your frontend roadmapData
    const seedData = [
      {
        skillId: 'counting-beats',
        title: 'Counting Beats',
        categoryId: 'rhythm-musicality',
        categoryTitle: 'Rhythm & Musicality',
        categoryDescription: 'Foundation of feeling the music',
        categoryDifficulty: 'beginner',
        categoryColor: 'from-purple-500 to-pink-500',
        difficulty: 'beginner',
        duration: '5 min',
        videoUrl: '',
        description: 'Learn to count musical beats',
        keyPoints: [
          'Stay relaxed and let the music guide your movement',
          'Focus on the downbeat (the "1" in the count)',
          'Practice with slower tempo music first'
        ],
        commonMistakes: [
          'Tensing up your body - stay loose!',
          'Rushing ahead of the beat',
          'Not listening to the full measure'
        ],
        practiceDrills: [
          {
            title: 'Drill 1: Count and Clap',
            description: 'Count "1, 2, 3, 4" out loud while clapping. Do this for 2 minutes straight.'
          },
          {
            title: 'Drill 2: Count with Music',
            description: 'Play your favorite song and count along with the beat.'
          }
        ],
        prerequisites: []
      },
      {
        skillId: 'finding-the-one',
        title: 'Finding the "1"',
        categoryId: 'rhythm-musicality',
        categoryTitle: 'Rhythm & Musicality',
        categoryDescription: 'Foundation of feeling the music',
        categoryDifficulty: 'beginner',
        categoryColor: 'from-purple-500 to-pink-500',
        difficulty: 'beginner',
        duration: '8 min',
        videoUrl: '',
        description: 'Identify the first beat in a measure',
        keyPoints: [
          'The "1" is typically the strongest beat',
          'Listen for the bass drum or kick',
          'Feel the natural emphasis in the music'
        ],
        commonMistakes: [
          'Confusing the "1" with other strong beats',
          'Starting your count in the middle of a measure'
        ],
        practiceDrills: [
          {
            title: 'Drill 1: Clap on the 1',
            description: 'Listen to music and only clap on the first beat of each measure.'
          }
        ],
        prerequisites: ['counting-beats']
      },
      {
        skillId: 'bounce-on-beat',
        title: 'Bouncing on Beat',
        categoryId: 'rhythm-musicality',
        categoryTitle: 'Rhythm & Musicality',
        categoryDescription: 'Foundation of feeling the music',
        categoryDifficulty: 'beginner',
        categoryColor: 'from-purple-500 to-pink-500',
        difficulty: 'beginner',
        duration: '10 min',
        videoUrl: '',
        description: 'Add body movement to the beat',
        keyPoints: [
          'Bend your knees slightly',
          'Let your body naturally move with the music',
          'Keep your upper body relaxed'
        ],
        commonMistakes: [
          'Tensing up your shoulders',
          'Bouncing too high or too stiff',
          'Not bending your knees enough'
        ],
        practiceDrills: [
          {
            title: 'Drill 1: Count and Bounce',
            description: 'Count "1, 2, 3, 4" out loud while bouncing. Do this for 2 minutes straight.'
          },
          {
            title: 'Drill 2: Mirror Practice',
            description: 'Practice in front of a mirror to check your form and timing.'
          }
        ],
        prerequisites: ['counting-beats', 'finding-the-one']
      },
      {
        skillId: 'basic-bounce',
        title: 'Basic Bounce',
        categoryId: 'core-grooves',
        categoryTitle: 'Core Grooves',
        categoryDescription: 'Essential hip-hop movements',
        categoryDifficulty: 'beginner',
        categoryColor: 'from-blue-500 to-cyan-500',
        difficulty: 'beginner',
        duration: '12 min',
        videoUrl: '',
        description: 'The foundation groove of hip-hop',
        keyPoints: [
          'Maintain a steady rhythm',
          'Use your knees as shock absorbers',
          'Keep your core engaged but relaxed'
        ],
        commonMistakes: [
          'Bouncing only from the waist up',
          'Forgetting to breathe',
          'Moving too fast for your skill level'
        ],
        practiceDrills: [
          {
            title: 'Drill 1: Slow Bounce',
            description: 'Practice bouncing at half tempo for better control.'
          }
        ],
        prerequisites: ['bounce-on-beat']
      },
      {
        skillId: 'two-step',
        title: 'Two-Step',
        categoryId: 'core-grooves',
        categoryTitle: 'Core Grooves',
        categoryDescription: 'Essential hip-hop movements',
        categoryDifficulty: 'beginner',
        categoryColor: 'from-blue-500 to-cyan-500',
        difficulty: 'beginner',
        duration: '15 min',
        videoUrl: '',
        description: 'Basic side-to-side movement',
        keyPoints: [
          'Transfer weight smoothly',
          'Stay low and grounded',
          'Add your own style'
        ],
        commonMistakes: [
          'Standing too upright',
          'Not fully transferring weight',
          'Rushing the movement'
        ],
        practiceDrills: [
          {
            title: 'Drill 1: Two-Step Slow',
            description: 'Practice the two-step at a slower tempo.'
          }
        ],
        prerequisites: ['basic-bounce']
      }
    ];

    // Insert all seed data
    const skills = [];
    for (const skillData of seedData) {
      const existingSkill = await Skill.findBySkillId(skillData.skillId);
      if (!existingSkill) {
        const skill = await Skill.create(skillData);
        skills.push(skill);
      }
    }

    res.status(201).json({
      success: true,
      message: `Seeded ${skills.length} skills`,
      skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};