import React from 'react';
import SkillPage from '../components/skill/SkillPage';

const SkillDetail = ({ skill, onBack }) => {
  console.log('SkillDetail - Rendering with skill:', skill); // Debug
  console.log('SkillDetail - onBack function:', onBack); // Debug
  
  return <SkillPage skill={skill} onBack={onBack} />;
};

export default SkillDetail;