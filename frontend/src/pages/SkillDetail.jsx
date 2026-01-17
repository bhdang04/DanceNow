import React from 'react';
import SkillPage from '../components/skill/SkillPage';

const SkillDetail = ({ skill, onBack }) => {
  return <SkillPage skill={skill} onBack={onBack} />;
};

export default SkillDetail;