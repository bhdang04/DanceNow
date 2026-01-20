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
    // Sample seed data - MAKE SURE THIS HAS DATA
   const seedData = [
    /* ================= RHYTHM & MUSICALITY ================= */

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
      description: 'Learn to count musical beats and identify the rhythm',
      keyPoints: [
        'Stay relaxed and let the music guide your movement',
        'Focus on the downbeat (the "1" in the count)',
        'Practice with slower tempo music first',
        'Count out loud to internalize the rhythm'
      ],
      commonMistakes: [
        'Tensing up your body - stay loose!',
        'Rushing ahead of the beat',
        'Not listening to the full measure',
        'Counting inconsistently'
      ],
      practiceDrills: [
        { title: 'Count and Clap', description: 'Count "1, 2, 3, 4" out loud while clapping for 2 minutes straight.' },
        { title: 'Count with Music', description: 'Play your favorite song and count along with the beat.' },
        { title: 'Silent Count', description: 'Count the beat in your head without saying it out loud.' }
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
      description: 'Identify the first beat in a musical measure',
      keyPoints: [
        'The "1" is typically the strongest beat',
        'Listen for the bass drum or kick',
        'Feel the natural emphasis in the music',
        'The "1" usually starts a new phrase'
      ],
      commonMistakes: [
        'Confusing the "1" with other strong beats',
        'Starting your count in the middle of a measure',
        'Missing the downbeat',
        'Not listening for the bass'
      ],
      practiceDrills: [
        { title: 'Clap on the 1', description: 'Clap only on the first beat of each measure.' },
        { title: 'Nod on the 1', description: 'Nod your head when you hear the "1".' },
        { title: 'Step on the 1', description: 'Step forward each time you identify the "1".' }
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
      description: 'Add body movement synchronized to the beat',
      keyPoints: [
        'Bend your knees slightly',
        'Let your body naturally move with the music',
        'Keep your upper body relaxed',
        'Bounce through your legs not your back',
        'Maintain consistent bounce height'
      ],
      commonMistakes: [
        'Tensing up your shoulders',
        'Bouncing too high or too stiff',
        'Not bending your knees enough',
        'Losing the rhythm',
        'Bouncing from the waist instead of the knees'
      ],
      practiceDrills: [
        { title: 'Count and Bounce', description: 'Count while bouncing for 2 minutes.' },
        { title: 'Mirror Practice', description: 'Check posture and timing in a mirror.' },
        { title: 'Slow Motion Bounce', description: 'Bounce at half speed to refine technique.' }
      ],
      prerequisites: ['counting-beats', 'finding-the-one']
    },
    {
      skillId: 'musicality-basics',
      title: 'Musicality Basics',
      categoryId: 'rhythm-musicality',
      categoryTitle: 'Rhythm & Musicality',
      categoryDescription: 'Foundation of feeling the music',
      categoryDifficulty: 'beginner',
      categoryColor: 'from-purple-500 to-pink-500',
      difficulty: 'beginner',
      duration: '12 min',
      videoUrl: '',
      description: 'Understanding how to interpret and express music through movement',
      keyPoints: [
        'Listen to different instruments',
        'Match movement to sound',
        'Understand song structure',
        'Feel the emotion of the music'
      ],
      commonMistakes: [
        'Dancing the same way every song',
        'Only focusing on the beat',
        'Ignoring melody',
        'Ignoring lyrics and mood'
      ],
      practiceDrills: [
        { title: 'Instrument Isolation', description: 'Move to drums, bass, then melody.' },
        { title: 'Tempo Change', description: 'Dance to slow then fast versions.' },
        { title: 'Emotion Expression', description: 'Dance happy, sad, angry to same beat.' }
      ],
      prerequisites: ['bounce-on-beat', 'finding-the-one']
    },

    /* ================= CORE GROOVES ================= */

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
      description: 'The foundational groove of hip-hop dance',
      keyPoints: [
        'Maintain steady rhythm',
        'Use knees as shock absorbers',
        'Stay grounded',
        'Let bounce flow through body'
      ],
      commonMistakes: [
        'Bouncing only from waist',
        'Holding breath',
        'Stiff upper body',
        'Losing balance'
      ],
      practiceDrills: [
        { title: 'Slow Bounce', description: 'Half-tempo bouncing.' },
        { title: 'Wall Bounce', description: 'Back against wall to check alignment.' },
        { title: 'Weighted Bounce', description: 'Hold light weights for strength.' }
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
      description: 'Basic side-to-side weight transfer',
      keyPoints: [
        'Shift weight smoothly',
        'Stay low',
        'Keep knees bent',
        'Move on beat'
      ],
      commonMistakes: [
        'Standing upright',
        'Incomplete weight transfer',
        'Rushing',
        'Stiff hips'
      ],
      practiceDrills: [
        { title: 'Slow Two-Step', description: 'Practice slowly.' },
        { title: 'Mirror Check', description: 'Watch weight shift.' },
        { title: 'Add Arms', description: 'Add arm movements.' }
      ],
      prerequisites: ['basic-bounce']
    },
    {
      skillId: 'rock-step',
      title: 'Rock Step',
      categoryId: 'core-grooves',
      categoryTitle: 'Core Grooves',
      categoryDescription: 'Essential hip-hop movements',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-blue-500 to-cyan-500',
      difficulty: 'intermediate',
      duration: '15 min',
      videoUrl: '',
      description: 'Forward and backward weight transfer',
      keyPoints: [
        'Rock weight smoothly',
        'Stay low',
        'Control momentum',
        'Relax upper body'
      ],
      commonMistakes: [
        'Losing balance',
        'Moving too fast',
        'Straight legs',
        'Stiff torso'
      ],
      practiceDrills: [
        { title: 'Slow Rock', description: 'Rock slowly focusing on balance.' },
        { title: 'Rock and Hold', description: 'Hold each rock for 2 counts.' },
        { title: 'Rock with Bounce', description: 'Add bounce to rock.' }
      ],
      prerequisites: ['two-step', 'basic-bounce']
    },
    {
      skillId: 'running-man',
      title: 'Running Man',
      categoryId: 'core-grooves',
      categoryTitle: 'Core Grooves',
      categoryDescription: 'Essential hip-hop movements',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-blue-500 to-cyan-500',
      difficulty: 'intermediate',
      duration: '18 min',
      videoUrl: '',
      description: 'Classic hip-hop running-in-place move',
      keyPoints: [
        'Slide back foot',
        'Lift front knee',
        'Stay light',
        'Use natural arm swing'
      ],
      commonMistakes: [
        'Lifting feet too high',
        'Stomping',
        'Poor arm coordination',
        'Moving backward unintentionally'
      ],
      practiceDrills: [
        { title: 'Slow Breakdown', description: 'Practice at half speed.' },
        { title: 'Stationary', description: 'Stay in place.' },
        { title: 'Directional', description: 'Move forward and backward.' }
      ],
      prerequisites: ['rock-step', 'two-step']
    },
    {
      skillId: 'brooklyn-step',
      title: 'Brooklyn Step',
      categoryId: 'core-grooves',
      categoryTitle: 'Core Grooves',
      categoryDescription: 'Essential hip-hop movements',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-blue-500 to-cyan-500',
      difficulty: 'intermediate',
      duration: '20 min',
      videoUrl: '',
      description: 'Smooth sliding step with attitude',
      keyPoints: [
        'Slide feet',
        'Stay low',
        'Shift weight deliberately',
        'Add bounce'
      ],
      commonMistakes: [
        'Lifting feet',
        'Rigid upper body',
        'Losing groove',
        'Poor weight transfer'
      ],
      practiceDrills: [
        { title: 'Brooklyn Basics', description: 'Practice slide without music.' },
        { title: 'Brooklyn Bounce', description: 'Add bounce.' },
        { title: 'Brooklyn Travel', description: 'Move across floor.' }
      ],
      prerequisites: ['two-step', 'rock-step']
    },

    /* ================= ISOLATIONS ================= */

    {
      skillId: 'chest-isolations',
      title: 'Chest Isolations',
      categoryId: 'isolations',
      categoryTitle: 'Isolations',
      categoryDescription: 'Control individual body parts',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-orange-500 to-red-500',
      difficulty: 'intermediate',
      duration: '20 min',
      videoUrl: '',
      description: 'Control chest movement independently',
      keyPoints: [
        'Move from sternum',
        'Keep body still',
        'Practice all directions',
        'Breathe naturally'
      ],
      commonMistakes: [
        'Moving shoulders',
        'Arching back',
        'Forcing movement',
        'Holding breath'
      ],
      practiceDrills: [
        { title: 'Four Directions', description: 'Front, back, left, right.' },
        { title: 'Chest Circles', description: 'Smooth controlled circles.' },
        { title: 'Mirror Check', description: 'Verify isolation.' }
      ],
      prerequisites: ['basic-bounce', 'two-step']
    },
    {
      skillId: 'shoulder-isolations',
      title: 'Shoulder Isolations',
      categoryId: 'isolations',
      categoryTitle: 'Isolations',
      categoryDescription: 'Control individual body parts',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-orange-500 to-red-500',
      difficulty: 'intermediate',
      duration: '18 min',
      videoUrl: '',
      description: 'Independent shoulder control',
      keyPoints: [
        'Isolate one shoulder',
        'Relax neck',
        'Full range of motion'
      ],
      commonMistakes: [
        'Moving chest',
        'Tensing neck',
        'Limited range',
        'Both shoulders moving'
      ],
      practiceDrills: [
        { title: 'Single Shoulder', description: 'Lift one shoulder repeatedly.' },
        { title: 'Shoulder Rolls', description: 'Slow rolls forward and back.' },
        { title: 'Alternating', description: 'Alternate to the beat.' }
      ],
      prerequisites: ['chest-isolations']
    },
    {
      skillId: 'head-isolations',
      title: 'Head Isolations',
      categoryId: 'isolations',
      categoryTitle: 'Isolations',
      categoryDescription: 'Control individual body parts',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-orange-500 to-red-500',
      difficulty: 'intermediate',
      duration: '15 min',
      videoUrl: '',
      description: 'Control head movement independently',
      keyPoints: [
        'Keep shoulders still',
        'Maintain neck alignment',
        'Move smoothly'
      ],
      commonMistakes: [
        'Straining neck',
        'Moving shoulders',
        'Over-extending'
      ],
      practiceDrills: [
        { title: 'Head Slides', description: 'Slide left and right.' },
        { title: 'Head Circles', description: 'Slow circles.' },
        { title: 'Chin Tucks', description: 'Forward and back.' }
      ],
      prerequisites: ['shoulder-isolations']
    },
    {
      skillId: 'hip-isolations',
      title: 'Hip Isolations',
      categoryId: 'isolations',
      categoryTitle: 'Isolations',
      categoryDescription: 'Control individual body parts',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-orange-500 to-red-500',
      difficulty: 'intermediate',
      duration: '22 min',
      videoUrl: '',
      description: 'Hip control in multiple directions',
      keyPoints: [
        'Isolate hips',
        'Keep chest forward',
        'Engage core'
      ],
      commonMistakes: [
        'Moving torso',
        'Arching back',
        'Locked knees'
      ],
      practiceDrills: [
        { title: 'Hip Squares', description: 'Square pattern.' },
        { title: 'Hip Circles', description: 'Smooth circles.' },
        { title: 'Hip Bumps', description: 'Sharp side hits.' }
      ],
      prerequisites: ['chest-isolations', 'shoulder-isolations']
    },
    {
      skillId: 'arm-waves',
      title: 'Arm Waves',
      categoryId: 'isolations',
      categoryTitle: 'Isolations',
      categoryDescription: 'Control individual body parts',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-orange-500 to-red-500',
      difficulty: 'intermediate',
      duration: '25 min',
      videoUrl: '',
      description: 'Fluid wave motion through arms',
      keyPoints: [
        'Isolate joints',
        'Move smoothly',
        'Relax arms'
      ],
      commonMistakes: [
        'Choppy waves',
        'Tense arms',
        'Skipping joints'
      ],
      practiceDrills: [
        { title: 'Slow Wave', description: 'Slow motion waves.' },
        { title: 'Joint Focus', description: 'One joint at a time.' },
        { title: 'Mirror Waves', description: 'Opposing arm waves.' }
      ],
      prerequisites: ['shoulder-isolations', 'chest-isolations']
    },

    /* ================= FOUNDATION STYLES ================= */

    {
      skillId: 'popping-basics',
      title: 'Popping Basics',
      categoryId: 'foundation-styles',
      categoryTitle: 'Foundation Styles',
      categoryDescription: 'Core hip-hop dance styles',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-green-500 to-emerald-500',
      difficulty: 'intermediate',
      duration: '25 min',
      videoUrl: '',
      description: 'Introduction to popping',
      keyPoints: [
        'Quick contractions',
        'Hit on beat',
        'Relax between hits'
      ],
      commonMistakes: [
        'Over-tensing',
        'Missing beat',
        'Forcing hits'
      ],
      practiceDrills: [
        { title: 'Chest Pops', description: 'Chest contractions.' },
        { title: 'Arm Hits', description: 'Arm pops.' },
        { title: 'Pop and Lock', description: 'Pop then freeze.' }
      ],
      prerequisites: ['chest-isolations', 'shoulder-isolations', 'hip-isolations']
    },
    {
      skillId: 'locking-basics',
      title: 'Locking Basics',
      categoryId: 'foundation-styles',
      categoryTitle: 'Foundation Styles',
      categoryDescription: 'Core hip-hop dance styles',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-green-500 to-emerald-500',
      difficulty: 'intermediate',
      duration: '25 min',
      videoUrl: '',
      description: 'Introduction to locking',
      keyPoints: [
        'Strong locks',
        'Quick movements',
        'Funky attitude'
      ],
      commonMistakes: [
        'Weak locks',
        'Low energy',
        'Unclear points'
      ],
      practiceDrills: [
        { title: 'Lock Positions', description: 'Basic lock holds.' },
        { title: 'Point Practice', description: 'Sharp points.' },
        { title: 'Lock and Freeze', description: 'Fast move then freeze.' }
      ],
      prerequisites: ['basic-bounce', 'two-step', 'arm-waves']
    },
    {
      skillId: 'breaking-basics',
      title: 'Breaking Basics',
      categoryId: 'foundation-styles',
      categoryTitle: 'Foundation Styles',
      categoryDescription: 'Core hip-hop dance styles',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-green-500 to-emerald-500',
      difficulty: 'intermediate',
      duration: '30 min',
      videoUrl: '',
      description: 'Introduction to breaking foundations',
      keyPoints: [
        'Build strength',
        'Learn top rock',
        'Practice six-step',
        'Respect culture'
      ],
      commonMistakes: [
        'Skipping foundations',
        'Poor form',
        'Not stretching'
      ],
      practiceDrills: [
        { title: 'Top Rock', description: 'Basic top rock.' },
        { title: 'Six-Step Slow', description: 'Slow breakdown.' },
        { title: 'Freeze Hold', description: 'Hold basic freezes.' }
      ],
      prerequisites: ['rock-step', 'basic-bounce', 'chest-isolations']
    },
    {
      skillId: 'house-basics',
      title: 'House Basics',
      categoryId: 'foundation-styles',
      categoryTitle: 'Foundation Styles',
      categoryDescription: 'Core hip-hop dance styles',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-green-500 to-emerald-500',
      difficulty: 'intermediate',
      duration: '28 min',
      videoUrl: '',
      description: 'Introduction to house dance',
      keyPoints: [
        'Fast footwork',
        'Stay light',
        'Use jacking motion'
      ],
      commonMistakes: [
        'Heavy footed',
        'Off beat',
        'Stiff torso'
      ],
      practiceDrills: [
        { title: 'House Jack', description: 'Basic jack.' },
        { title: 'Footwork Drills', description: 'Slow patterns.' },
        { title: 'Music Familiarity', description: 'Listen to house music.' }
      ],
      prerequisites: ['two-step', 'running-man', 'basic-bounce']
    },
    {
      skillId: 'krump-basics',
      title: 'Krump Basics',
      categoryId: 'foundation-styles',
      categoryTitle: 'Foundation Styles',
      categoryDescription: 'Core hip-hop dance styles',
      categoryDifficulty: 'advanced',
      categoryColor: 'from-green-500 to-emerald-500',
      difficulty: 'advanced',
      duration: '30 min',
      videoUrl: '',
      description: 'Introduction to krumping',
      keyPoints: [
        'Channel emotion',
        'Big powerful movements',
        'Storytelling'
      ],
      commonMistakes: [
        'No control',
        'No emotion',
        'Disrespecting culture'
      ],
      practiceDrills: [
        { title: 'Power Chest Pops', description: 'Strong chest hits.' },
        { title: 'Arm Swings', description: 'Controlled swings.' },
        { title: 'Stomp Practice', description: 'Strong stomps.' }
      ],
      prerequisites: ['popping-basics', 'chest-isolations', 'hip-isolations']
    },

    /* ================= FREESTYLE ================= */

    {
      skillId: 'freestyle-intro',
      title: 'Freestyle Introduction',
      categoryId: 'freestyle-basics',
      categoryTitle: 'Freestyle Basics',
      categoryDescription: 'Building your own style',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-yellow-500 to-orange-500',
      difficulty: 'intermediate',
      duration: '20 min',
      videoUrl: '',
      description: 'Introduction to freestyle',
      keyPoints: [
        'Do not overthink',
        'Listen to music',
        'React naturally'
      ],
      commonMistakes: [
        'Stopping',
        'Repeating same moves',
        'Low confidence'
      ],
      practiceDrills: [
        { title: '30 Second Freestyle', description: 'Do not stop.' },
        { title: 'Different Music', description: 'Unfamiliar genres.' },
        { title: 'No Mirror', description: 'Build awareness.' }
      ],
      prerequisites: ['musicality-basics', 'basic-bounce', 'two-step']
    },
    {
      skillId: 'musicality-advanced',
      title: 'Advanced Musicality',
      categoryId: 'freestyle-basics',
      categoryTitle: 'Freestyle Basics',
      categoryDescription: 'Building your own style',
      categoryDifficulty: 'advanced',
      categoryColor: 'from-yellow-500 to-orange-500',
      difficulty: 'advanced',
      duration: '25 min',
      videoUrl: '',
      description: 'Advanced music interpretation',
      keyPoints: [
        'Dance to instruments',
        'Use dynamics',
        'Tell a story'
      ],
      commonMistakes: [
        'Only dancing to beat',
        'Repetitive movement',
        'No dynamics'
      ],
      practiceDrills: [
        { title: 'Instrument Challenge', description: 'One instrument only.' },
        { title: 'Lyrics Interpretation', description: 'Move to lyrics.' },
        { title: 'Dynamics Practice', description: 'Energy changes.' }
      ],
      prerequisites: ['musicality-basics', 'freestyle-intro']
    },
    {
      skillId: 'building-combos',
      title: 'Building Combinations',
      categoryId: 'freestyle-basics',
      categoryTitle: 'Freestyle Basics',
      categoryDescription: 'Building your own style',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-yellow-500 to-orange-500',
      difficulty: 'intermediate',
      duration: '20 min',
      videoUrl: '',
      description: 'Learn to combine moves',
      keyPoints: [
        'Use transitions',
        'Repeat for muscle memory',
        'Add variations'
      ],
      commonMistakes: [
        'Choppy transitions',
        'Forgetting combos',
        'No personal style'
      ],
      practiceDrills: [
        { title: '3-Move Combo', description: 'Create a combo.' },
        { title: 'Transition Focus', description: 'Smooth transitions.' },
        { title: 'Combo Variations', description: 'Create 3 variations.' }
      ],
      prerequisites: ['two-step', 'basic-bounce', 'rock-step', 'freestyle-intro']
    },
    {
      skillId: 'cypher-etiquette',
      title: 'Cypher Etiquette',
      categoryId: 'freestyle-basics',
      categoryTitle: 'Freestyle Basics',
      categoryDescription: 'Building your own style',
      categoryDifficulty: 'beginner',
      categoryColor: 'from-yellow-500 to-orange-500',
      difficulty: 'beginner',
      duration: '10 min',
      videoUrl: '',
      description: 'Understanding cypher culture',
      keyPoints: [
        'Respect the circle',
        'Take turns',
        'Hype others'
      ],
      commonMistakes: [
        'Hogging circle',
        'Disrespect',
        'Low energy'
      ],
      practiceDrills: [
        { title: 'Observation', description: 'Watch cypher videos.' },
        { title: 'Circle Practice', description: 'Practice with friends.' },
        { title: 'Hyping Practice', description: 'Support others.' }
      ],
      prerequisites: []
    },
    {
      skillId: 'performance-basics',
      title: 'Performance Basics',
      categoryId: 'freestyle-basics',
      categoryTitle: 'Freestyle Basics',
      categoryDescription: 'Building your own style',
      categoryDifficulty: 'intermediate',
      categoryColor: 'from-yellow-500 to-orange-500',
      difficulty: 'intermediate',
      duration: '22 min',
      videoUrl: '',
      description: 'Stage presence and confidence',
      keyPoints: [
        'Make eye contact',
        'Project energy',
        'Use space',
        'Commit fully'
      ],
      commonMistakes: [
        'Looking down',
        'Low energy',
        'No facial expression'
      ],
      practiceDrills: [
        { title: 'Eye Contact Drill', description: 'Practice eye contact.' },
        { title: 'Full Space', description: 'Use entire room.' },
        { title: 'Expression Practice', description: 'Exaggerated expressions.' }
      ],
      prerequisites: ['freestyle-intro', 'building-combos']
    }
  ];

    console.log('Seeding', seedData.length, 'skills...');

    // Insert all seed data
    const skills = [];
    for (const skillData of seedData) {
      const existingSkill = await Skill.findBySkillId(skillData.skillId);
      if (!existingSkill) {
        const skill = await Skill.create(skillData);
        skills.push(skill);
      }
    }

    console.log('Seeded', skills.length, 'new skills');

    res.status(201).json({
      success: true,
      message: `Seeded ${skills.length} skills`,
      skills
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};